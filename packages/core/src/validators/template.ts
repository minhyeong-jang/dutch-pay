import { z } from "zod";

export const createTemplateSchema = z.object({
  name: z.string().min(1, "모임 이름을 입력해주세요").max(50),
});

export const updateTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
export type UpdateTemplateInput = z.infer<typeof updateTemplateSchema>;
