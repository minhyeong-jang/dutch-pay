import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";

import {
  calculateReceiveSummary,
  calculateSettlement,
} from "@dutch/core/settlement";
import { eq } from "@dutch/db";
import { templates } from "@dutch/db/schema";

import { publicProcedure } from "../trpc";

export const settlementRouter = {
  /** 정산 결과 계산 */
  calculate: publicProcedure
    .input(z.object({ templateId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const template = await ctx.db.query.templates.findFirst({
        where: eq(templates.id, input.templateId),
        with: {
          participants: true,
          payments: {
            with: {
              payer: true,
              participants: {
                with: {
                  participant: true,
                },
              },
            },
          },
        },
      });

      if (!template) {
        return null;
      }

      const participantNames = template.participants.map((p) => p.name);

      const paymentInputs = template.payments.map((payment) => ({
        amount: payment.amount,
        payerName: payment.payer?.name ?? "",
        participantNames: payment.participants.map(
          (pp) => pp.participant.name,
        ),
      }));

      const settlement = calculateSettlement(participantNames, paymentInputs);
      const receiveSummary = calculateReceiveSummary(
        participantNames,
        settlement,
      );

      return {
        settlement,
        receiveSummary,
        totalAmount: template.payments.reduce((sum, p) => sum + p.amount, 0),
      };
    }),
} satisfies TRPCRouterRecord;
