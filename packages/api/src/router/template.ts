import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";

import { and, desc, eq } from "@dutch/db";
import { templates } from "@dutch/db/schema";

import { protectedProcedure } from "../trpc";

export const templateRouter = {
  /** 내 모임 목록 조회 */
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.templates.findMany({
      where: eq(templates.userId, ctx.user.id),
      orderBy: desc(templates.createdAt),
      with: { participants: true, payments: true },
    });
  }),

  /** 모임 상세 (참가자 + 결제내역 포함) */
  byId: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.templates.findFirst({
        where: and(eq(templates.id, input.id), eq(templates.userId, ctx.user.id)),
        with: {
          participants: true,
          payments: {
            with: {
              participants: true,
            },
          },
        },
      });
    }),

  /** 모임 생성 */
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1).max(50) }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .insert(templates)
        .values({ name: input.name, userId: ctx.user.id })
        .returning();
    }),

  /** 모임 이름 수정 */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().min(1).max(50),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(templates)
        .set({ name: input.name })
        .where(
          and(eq(templates.id, input.id), eq(templates.userId, ctx.user.id)),
        )
        .returning();
    }),

  /** 모임 삭제 (소유자 검증) */
  delete: protectedProcedure
    .input(z.string().uuid())
    .mutation(({ ctx, input }) => {
      return ctx.db
        .delete(templates)
        .where(
          and(eq(templates.id, input), eq(templates.userId, ctx.user.id)),
        );
    }),
} satisfies TRPCRouterRecord;
