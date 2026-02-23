"use client";

import { Card, CardContent } from "~/components/ui/card";
import { formatKRW } from "~/lib/format";

interface SettlementSummaryProps {
  totalAmount: number;
  participantCount: number;
  paymentCount: number;
}

export function SettlementSummary({
  totalAmount,
  participantCount,
  paymentCount,
}: SettlementSummaryProps) {
  return (
    <Card className="border-0 bg-primary text-primary-foreground shadow-md">
      <CardContent className="flex flex-col items-center gap-1 py-6">
        <p className="text-sm font-medium opacity-90">총 사용 금액</p>
        <p className="text-3xl font-bold">{formatKRW(totalAmount)}</p>
        <p className="mt-1 text-sm opacity-80">
          {participantCount}명 참여 · {paymentCount}건 결제
        </p>
      </CardContent>
    </Card>
  );
}
