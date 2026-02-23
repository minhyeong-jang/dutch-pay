import { z } from "zod";

export const paymentSchema = z.object({
  title: z.string().min(1, "결제 내역을 입력해주세요"),
  amount: z.number().int().positive("금액은 0보다 커야 합니다"),
  payerName: z.string().min(1, "결제자를 선택해주세요"),
  participantNames: z.array(z.string()).min(1, "참여자를 선택해주세요"),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
