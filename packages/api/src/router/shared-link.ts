import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod/v4";

import { and, desc, eq, inArray } from "@dutch/db";
import { sharedLinks, templates } from "@dutch/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

function generateToken(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 21);
}

export const sharedLinkRouter = {
  /** 공유 링크 생성 */
  create: protectedProcedure
    .input(z.object({ templateId: z.string().uuid() }))
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

      const token = generateToken();

      const [link] = await ctx.db
        .insert(sharedLinks)
        .values({
          templateId: input.templateId,
          token,
          isReadonly: true,
        })
        .returning();

      return link;
    }),

  /** 토큰으로 template 전체 데이터 반환 (public) */
  resolve: publicProcedure
    .input(z.object({ token: z.string().min(1).max(100) }))
    .query(async ({ ctx, input }) => {
      const link = await ctx.db.query.sharedLinks.findFirst({
        where: eq(sharedLinks.token, input.token),
        with: {
          template: {
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
          },
        },
      });

      if (!link) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "링크를 찾을 수 없습니다.",
        });
      }

      if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "만료된 링크입니다.",
        });
      }

      return {
        template: link.template,
        isReadonly: link.isReadonly,
        expiresAt: link.expiresAt,
      };
    }),

  /** 공유 링크 삭제 */
  delete: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(sharedLinks).where(
        and(
          eq(sharedLinks.id, input),
          inArray(
            sharedLinks.templateId,
            ctx.db
              .select({ id: templates.id })
              .from(templates)
              .where(eq(templates.userId, ctx.user.id)),
          ),
        ),
      );
    }),

  /** 특정 모임의 공유 링크 목록 */
  listByTemplate: protectedProcedure
    .input(z.object({ templateId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.sharedLinks.findMany({
        where: and(
          eq(sharedLinks.templateId, input.templateId),
          inArray(
            sharedLinks.templateId,
            ctx.db
              .select({ id: templates.id })
              .from(templates)
              .where(eq(templates.userId, ctx.user.id)),
          ),
        ),
        orderBy: desc(sharedLinks.createdAt),
      });
    }),
} satisfies TRPCRouterRecord;
