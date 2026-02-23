import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4";

import { desc, eq } from "@dutch/db";
import { templates } from "@dutch/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

export const templateRouter = {
  /** 내 모임 목록 조회 */
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.templates.findMany({
      where: eq(templates.userId, ctx.user.id),
      orderBy: desc(templates.createdAt),
    });
  }),

  /** 모임 상세 (참가자 + 결제내역 포함) */
  byId: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.templates.findFirst({
        where: eq(templates.id, input.id),
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

  /** 모임 삭제 */
  delete: protectedProcedure
    .input(z.string().uuid())
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(templates).where(eq(templates.id, input));
    }),
} satisfies TRPCRouterRecord;
