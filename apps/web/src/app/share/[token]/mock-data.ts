import type { LocalTemplate } from "~/lib/store";

export interface ShareData {
  template: LocalTemplate;
  totalAmount: number;
  participantCount: number;
  isReadonly: boolean;
}

/**
 * v1.0: 모든 토큰에 대해 동일한 mock 데이터를 반환합니다.
 * 향후 sharedLink.resolve API로 교체 예정.
 */
export function getMockShareData(token: string): ShareData | null {
  if (!token) return null;

  const template: LocalTemplate = {
    id: "mock-share-template",
    name: "부산 여행",
    participants: [
      { id: "p1", name: "민수", tagColor: "#0D9488" },
      { id: "p2", name: "지영", tagColor: "#F97316" },
      { id: "p3", name: "현우", tagColor: "#8B5CF6" },
      { id: "p4", name: "수진", tagColor: "#F43F5E" },
    ],
    payments: [
      {
        id: "pay1",
        title: "점심 식사",
        amount: 54000,
        payerId: "p1",
        participantIds: ["p1", "p2", "p3", "p4"],
      },
      {
        id: "pay2",
        title: "카페",
        amount: 22000,
        payerId: "p2",
        participantIds: ["p1", "p2", "p3", "p4"],
      },
      {
        id: "pay3",
        title: "택시",
        amount: 18000,
        payerId: "p3",
        participantIds: ["p1", "p2", "p3"],
      },
      {
        id: "pay4",
        title: "저녁 식사",
        amount: 88000,
        payerId: "p1",
        participantIds: ["p1", "p2", "p3", "p4"],
      },
      {
        id: "pay5",
        title: "편의점",
        amount: 12000,
        payerId: "p4",
        participantIds: ["p1", "p2", "p4"],
      },
    ],
    createdAt: "2026-02-20T10:00:00Z",
    updatedAt: "2026-02-22T18:30:00Z",
  };

  const totalAmount = template.payments.reduce((sum, p) => sum + p.amount, 0);

  return {
    template,
    totalAmount,
    participantCount: template.participants.length,
    isReadonly: true,
  };
}
