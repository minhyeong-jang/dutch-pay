import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { and, eq } from "@dutch/db";
import { paymentParticipants, payments, templates } from "@dutch/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

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

  /** 결제내역 추가 (template 소유 검증) */
  create: protectedProcedure
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
      const template = await ctx.db.query.templates.findFirst({
        where: and(
          eq(templates.id, input.templateId),
          eq(templates.userId, ctx.user.id),
        ),
      });

      if (!template) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

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

  /** 결제내역 삭제 (template 소유 검증) */
  delete: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input }) => {
      const payment = await ctx.db.query.payments.findFirst({
        where: eq(payments.id, input),
        with: {
          template: true,
        },
      });

      if (payment?.template.userId !== ctx.user.id) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return ctx.db.delete(payments).where(eq(payments.id, input));
    }),
} satisfies TRPCRouterRecord;
