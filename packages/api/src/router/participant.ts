import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { and, eq } from "@dutch/db";
import { participants, paymentParticipants, templates } from "@dutch/db/schema";

import { protectedProcedure } from "../trpc";

export const participantRouter = {
  /** 특정 모임의 참가자 목록 조회 */
  list: protectedProcedure
    .input(z.object({ templateId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const template = await ctx.db.query.templates.findFirst({
        where: and(
          eq(templates.id, input.templateId),
          eq(templates.userId, ctx.user.id),
        ),
      });

      if (!template) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return ctx.db.query.participants.findMany({
        where: eq(participants.templateId, input.templateId),
      });
    }),

  /** 참가자 추가 */
  create: protectedProcedure
    .input(
      z.object({
        templateId: z.string().uuid(),
        name: z.string().min(1).max(20),
        tagColor: z.string(),
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

      const [participant] = await ctx.db
        .insert(participants)
        .values(input)
        .returning();

      return participant;
    }),

  /** 참가자 삭제 (결제 참여 여부 체크) */
  delete: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input }) => {
      // 참가자 존재 + template 소유 검증
      const participant = await ctx.db.query.participants.findFirst({
        where: eq(participants.id, input),
        with: {
          template: true,
        },
      });

      if (participant?.template.userId !== ctx.user.id) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // 결제에 참여 중인지 체크
      const participatingPayments =
        await ctx.db.query.paymentParticipants.findMany({
          where: eq(paymentParticipants.participantId, input),
        });

      if (participatingPayments.length > 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "결제에 참여 중인 참가자는 삭제할 수 없습니다. 먼저 관련 결제를 삭제해주세요.",
        });
      }

      return ctx.db
        .delete(participants)
        .where(eq(participants.id, input));
    }),
} satisfies TRPCRouterRecord;
