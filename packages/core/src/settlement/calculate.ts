import type { PaymentInput, ReceiveSummary, SettlementResult } from "./types";

/**
 * 정산 금액을 계산합니다.
 * 순수 함수 - React 의존성 없음.
 *
 * @param participantNames - 참가자 이름 목록
 * @param payments - 결제 내역 (금액, 결제자, 참여자)
 * @returns 참가자별 누가 누구에게 얼마를 보내야 하는지
 */
export function calculateSettlement(
  participantNames: string[],
  payments: PaymentInput[],
): SettlementResult {
  const result: SettlementResult = {};

  const emptySendList = participantNames.reduce<Record<string, number>>(
    (prev, curr) => ({ ...prev, [curr]: 0 }),
    {},
  );

  for (const name of participantNames) {
    result[name] = {
      paymentTotal: 0,
      tossTotal: 0,
      sendList: { ...emptySendList },
    };
  }

  for (const payment of payments) {
    const { amount, participantNames: partNames, payerName } = payment;
    if (!amount || !payerName || partNames.length === 0) continue;

    const perPerson = amount / partNames.length;
    const payerInfo = result[payerName];
    if (!payerInfo) continue;

    payerInfo.paymentTotal += amount;

    for (const partName of partNames) {
      if (partName === payerName) continue;
      const participantInfo = result[partName];
      if (!participantInfo) continue;

      const difference = (payerInfo.sendList[partName] ?? 0) - perPerson;
      if (difference >= 0) {
        payerInfo.sendList[partName] = difference;
      } else {
        payerInfo.sendList[partName] = 0;
        participantInfo.sendList[payerName] =
          (participantInfo.sendList[payerName] ?? 0) + -difference;
      }
    }
  }

  // tossTotal 계산 (원 단위 내림)
  for (const name of Object.keys(result)) {
    const entry = result[name];
    if (!entry) continue;
    entry.tossTotal = Object.values(entry.sendList).reduce(
      (sum, val) => sum + Math.floor(val || 0),
      0,
    );
  }

  return result;
}

/**
 * 최적화 없이 건별로 따로 보냈을 때의 송금 횟수를 계산합니다.
 * 각 결제건마다 결제자를 제외한 참가자 수만큼 송금이 필요합니다.
 */
export function countDirectTransfers(payments: PaymentInput[]): number {
  return payments.reduce(
    (sum, p) => sum + Math.max(0, p.participantNames.length - 1),
    0,
  );
}

/**
 * 정산 최적화 후 실제 필요한 송금 횟수를 계산합니다.
 */
export function countOptimizedTransfers(settlement: SettlementResult): number {
  let count = 0;
  for (const entry of Object.values(settlement)) {
    for (const amount of Object.values(entry.sendList)) {
      if (Math.floor(amount) > 0) count++;
    }
  }
  return count;
}

/**
 * 각 참가자가 받아야 할 금액을 계산합니다.
 *
 * @param participantNames - 참가자 이름 목록
 * @param settlement - calculateSettlement의 결과
 * @returns 참가자별 수령 금액 + totalPrice
 */
export function calculateReceiveSummary(
  participantNames: string[],
  settlement: SettlementResult,
): ReceiveSummary {
  const summary: ReceiveSummary = { totalPrice: 0 };

  for (const name of participantNames) {
    let total = 0;
    for (const payerName of Object.keys(settlement)) {
      total += Math.floor(settlement[payerName]?.sendList[name] ?? 0);
    }
    summary.totalPrice = (summary.totalPrice ?? 0) + total;
    summary[name] = total;
  }

  return summary;
}
