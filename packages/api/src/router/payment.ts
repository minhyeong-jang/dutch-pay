import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";

import { eq } from "@dutch/db";
import { paymentParticipants, payments } from "@dutch/db/schema";

import { publicProcedure } from "../trpc";

export const paymentRouter = {
  /** 특정 모임의 결제내역 조회 */
  listByTemplate: publicProcedure
    .input(z.object({ templateId: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.payments.findMany({
        where: eq(payments.templateId, input.templateId),
        with: {
          payer: true,
          participants: {
            with: {
              participant: true,
            },
          },
        },
      });
    }),

  /** 결제내역 추가 */
  create: publicProcedure
    .input(
      z.object({
        templateId: z.string().uuid(),
        title: z.string().min(1),
        amount: z.number().int().positive(),
        payerId: z.string().uuid(),
        participantIds: z.array(z.string().uuid()).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { participantIds, ...paymentData } = input;

      const [payment] = await ctx.db
        .insert(payments)
        .values(paymentData)
        .returning();

      if (payment) {
        await ctx.db.insert(paymentParticipants).values(
          participantIds.map((participantId) => ({
            paymentId: payment.id,
            participantId,
          })),
        );
      }

      return payment;
    }),

  /** 결제내역 삭제 */
  delete: publicProcedure
    .input(z.string().uuid())
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(payments).where(eq(payments.id, input));
    }),
} satisfies TRPCRouterRecord;
