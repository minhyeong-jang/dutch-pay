/** 각 참가자별 정산 정보 */
export interface SettlementEntry {
  /** 이 사람이 직접 결제한 총액 */
  paymentTotal: number;
  /** 이 사람이 다른 사람들에게 보내야 할 총액 */
  tossTotal: number;
  /** 누구에게 얼마를 보내야 하는지 */
  sendList: Record<string, number>;
}

/** 전체 정산 결과: 참가자 이름 → 정산 정보 */
export type SettlementResult = Record<string, SettlementEntry>;

/** 각 참가자가 받아야 할 금액 (+ totalPrice) */
export type ReceiveSummary = Record<string, number>;

/** 정산 계산 입력 */
export interface PaymentInput {
  amount: number;
  payerName: string;
  participantNames: string[];
}
