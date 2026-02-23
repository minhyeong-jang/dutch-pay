import { z } from "zod";

export const participantSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  tagColor: z.string(),
});

export type ParticipantInput = z.infer<typeof participantSchema>;
