"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  calculateSettlement,
  countDirectTransfers,
  type PaymentInput,
} from "@dutch/core/settlement";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const participants = ["민수", "지은", "현우", "수빈"];

const payments: (PaymentInput & { label: string })[] = [
  {
    label: "숙소",
    amount: 240000,
    payerName: "민수",
    participantNames: participants,
  },
  {
    label: "삼겹살",
    amount: 96000,
    payerName: "지은",
    participantNames: participants,
  },
  {
    label: "카페",
    amount: 28000,
    payerName: "현우",
    participantNames: participants,
  },
];

function formatAmount(amount: number) {
  return amount.toLocaleString("ko-KR") + "원";
}

export function LiveDemo() {
  const [showResult, setShowResult] = useState(false);

  const result = showResult
    ? calculateSettlement(participants, payments)
    : null;

  // Collect all send entries
  const transfers: { from: string; to: string; amount: number }[] = [];
  if (result) {
    for (const [name, entry] of Object.entries(result)) {
      for (const [target, amount] of Object.entries(entry.sendList)) {
        const floored = Math.floor(amount);
        if (floored > 0) {
          transfers.push({ from: name, to: target, amount: floored });
        }
      }
    }
  }

  return (
    <section
      aria-label="정산 데모"
      className="bg-[oklch(0.96_0.005_180)] py-16 sm:py-20 lg:py-30 dark:bg-[oklch(0.17_0.005_180)]"
    >
      <div className="container mx-auto">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-sm font-medium tracking-wide text-primary">
            직접 해보세요
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            말로 하면 복잡하죠? 직접 보세요.
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Input card */}
          <Card>
            <CardHeader>
              <CardTitle>결제 내역</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {participants.map((name) => (
                  <span
                    key={name}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {name}
                  </span>
                ))}
              </div>
              {payments.map((payment) => (
                <div
                  key={payment.label}
                  className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{payment.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.payerName} 결제
                    </p>
                  </div>
                  <p className="font-mono font-bold">
                    {formatAmount(payment.amount)}
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-between border-t pt-3">
                <p className="font-medium">총 결제 금액</p>
                <p className="font-mono font-bold text-primary">
                  {formatAmount(
                    payments.reduce((sum, p) => sum + p.amount, 0),
                  )}
                </p>
              </div>
              {!showResult && (
                <Button
                  className="mt-2 w-full"
                  size="lg"
                  onClick={() => setShowResult(true)}
                >
                  정산하기
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Result card */}
          <Card
            className={
              showResult
                ? "opacity-100 transition-opacity duration-500"
                : "pointer-events-none opacity-30 transition-opacity duration-500"
            }
          >
            <CardHeader>
              <CardTitle>정산 결과</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {showResult && transfers.length > 0 ? (
                <>
                  {transfers.map((t) => (
                    <div
                      key={`${t.from}-${t.to}`}
                      className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3"
                    >
                      <span className="font-medium">{t.from}</span>
                      <ArrowRight className="size-4 shrink-0 text-primary" />
                      <span className="font-medium">{t.to}</span>
                      <span className="ml-auto font-mono font-bold text-primary">
                        {formatAmount(t.amount)}
                      </span>
                    </div>
                  ))}
                  <div className="mt-1 rounded-lg bg-primary/5 px-4 py-3 text-center">
                    <p className="text-sm text-muted-foreground">
                      건별로 따로 보내면{" "}
                      <span className="font-semibold text-foreground">
                        {countDirectTransfers(payments)}번
                      </span>
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-primary">
                      나란이 정리해주면?{" "}
                      <span className="text-lg font-bold">
                        {transfers.length}번
                      </span>
                      이면 끝!
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex h-40 items-center justify-center text-muted-foreground">
                  &quot;정산하기&quot; 버튼을 눌러보세요
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
