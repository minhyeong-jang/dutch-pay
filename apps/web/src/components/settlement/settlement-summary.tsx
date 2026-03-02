"use client";

import { Card, CardContent } from "~/components/ui/card";
import { formatKRW } from "~/lib/format";

interface SettlementSummaryProps {
  totalAmount: number;
  participantCount: number;
  paymentCount: number;
  directTransferCount: number;
  optimizedTransferCount: number;
}

export function SettlementSummary({
  totalAmount,
  participantCount,
  paymentCount,
  directTransferCount,
  optimizedTransferCount,
}: SettlementSummaryProps) {
  const saved = directTransferCount - optimizedTransferCount;

  return (
    <Card className="border-0 bg-primary text-primary-foreground shadow-md">
      <CardContent className="flex flex-col items-center gap-1 py-6">
        <p className="text-sm font-medium opacity-90">총 사용 금액</p>
        <p className="text-3xl font-bold tabular-nums">{formatKRW(totalAmount)}</p>
        <p className="mt-1 text-sm opacity-80">
          {participantCount}명 참여 · {paymentCount}건 결제
        </p>
        {saved > 0 && (
          <p className="mt-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium">
            건별로 보내면 {directTransferCount}번 → 나란이 정리하면{" "}
            {optimizedTransferCount}번이면 끝
          </p>
        )}
      </CardContent>
    </Card>
  );
}
