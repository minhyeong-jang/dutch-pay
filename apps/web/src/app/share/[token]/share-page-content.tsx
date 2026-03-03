"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Copy, Link2, Search } from "lucide-react";

import {
  calculateSettlement,
  calculateReceiveSummary,
  countDirectTransfers,
  countOptimizedTransfers,
} from "@naran/core";
import { Button } from "~/components/ui/button";
import type { ChipItem } from "~/components/ui/chip-select";
import { ChipSelect } from "~/components/ui/chip-select";
import { Card, CardContent } from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Separator } from "~/components/ui/separator";
import { BRAND } from "~/lib/constants";
import { formatKRW, formatDate } from "~/lib/format";
import { toast } from "sonner";

interface SharePageContentProps {
  data: {
    template: {
      id: string;
      name: string;
      participants: Array<{
        id: string;
        name: string;
        tagColor: string;
        [key: string]: unknown;
      }>;
      payments: Array<{
        id: string;
        title: string;
        amount: number;
        payerId: string | null;
        payer: { name: string; tagColor: string; [key: string]: unknown } | null;
        participants: Array<{
          participantId: string;
          participant: { name: string; [key: string]: unknown };
        }>;
        [key: string]: unknown;
      }>;
      createdAt: Date | null;
      [key: string]: unknown;
    };
    isReadonly: boolean;
    expiresAt: Date | null;
  };
}

export function SharePageContent({ data }: SharePageContentProps) {
  const { template } = data;
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const totalAmount = useMemo(
    () => template.payments.reduce((sum, p) => sum + p.amount, 0),
    [template.payments],
  );

  const { participantNames, payments } = useMemo(() => {
    const participantNames = template.participants.map((p) => p.name);
    const payments = template.payments
      .filter(
        (p) => p.payerId && p.participants.length > 0 && p.amount > 0,
      )
      .map((p) => ({
        amount: p.amount,
        payerName: p.payer?.name ?? "",
        participantNames: p.participants.map((pp) => pp.participant.name),
      }));
    return { participantNames, payments };
  }, [template]);

  const settlement = useMemo(
    () => calculateSettlement(participantNames, payments),
    [participantNames, payments],
  );

  const receiveSummary = useMemo(
    () => calculateReceiveSummary(participantNames, settlement),
    [participantNames, settlement],
  );

  const participantMap = useMemo(
    () => new Map(template.participants.map((p) => [p.name, p.tagColor])),
    [template.participants],
  );

  const nameFinderItems: ChipItem[] = useMemo(
    () =>
      template.participants.map((p) => ({
        id: p.name,
        label: p.name,
        color: p.tagColor,
      })),
    [template.participants],
  );

  const handleNameClick = (name: string) => {
    setSelectedName(selectedName === name ? null : name);
  };

  const handleCopyText = async () => {
    const lines: string[] = [];
    lines.push(`[${template.name} 정산 결과]`);
    lines.push(
      `총 ${formatKRW(totalAmount)} (${template.participants.length}명)`,
    );
    lines.push("");

    for (const senderName of participantNames) {
      const entry = settlement[senderName];
      if (!entry) continue;
      for (const [receiverName, amount] of Object.entries(entry.sendList)) {
        const floored = Math.floor(amount);
        if (floored <= 0) continue;
        lines.push(`${senderName} → ${receiverName}: ${formatKRW(floored)}`);
      }
    }

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      toast.success("복사되었어요");
    } catch {
      toast.error("복사에 실패했어요");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 복사되었어요");
    } catch {
      toast.error("복사에 실패했어요");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/95 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-primary">{BRAND.name}</span>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            앱 열기
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col gap-4 p-4 pb-32">
        {/* Summary Card */}
        <Card className="border-0 bg-primary text-primary-foreground shadow-md">
          <CardContent className="flex flex-col items-center gap-1 py-6">
            <p className="text-lg font-semibold">{template.name}</p>
            <p className="text-3xl font-bold tabular-nums">
              {formatKRW(totalAmount)}
            </p>
            <p className="mt-1 text-sm opacity-80">
              {template.participants.length}명 참여 ·{" "}
              {template.payments.length}건 결제
            </p>
            {countDirectTransfers(payments) >
              countOptimizedTransfers(settlement) && (
              <p className="mt-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium">
                건별로 보내면 {countDirectTransfers(payments)}번 → 나란이
                정리하면 {countOptimizedTransfers(settlement)}번이면 끝
              </p>
            )}
            <p className="text-xs opacity-60">
              {formatDate(template.createdAt)}
            </p>
          </CardContent>
        </Card>

        {/* Share Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyText}
            className="flex-1"
          >
            <Copy className="size-4" />
            텍스트 복사
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="flex-1"
          >
            <Link2 className="size-4" />
            링크 복사
          </Button>
        </div>

        <Separator />

        {/* Name Finder */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Search className="size-4" />
            내 이름 찾기
          </div>
          <ChipSelect
            mode="single"
            items={nameFinderItems}
            value={selectedName ?? ""}
            onChange={handleNameClick}
            showColorDot
          />
        </div>

        <Separator />

        {/* Settlement Results */}
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-semibold">정산 결과</h2>
          {participantNames.map((name) => {
            const entry = settlement[name];
            if (!entry) return null;

            const receiveTotal =
              typeof receiveSummary[name] === "number"
                ? receiveSummary[name]
                : 0;

            const isSelected = selectedName === name;
            const isDimmed = selectedName !== null && !isSelected;

            return (
              <ShareSettlementCard
                key={name}
                name={name}
                tagColor={participantMap.get(name) ?? "#64748B"}
                paymentTotal={entry.paymentTotal}
                tossTotal={entry.tossTotal}
                receiveTotal={receiveTotal}
                sendList={entry.sendList}
                isSelected={isSelected}
                isDimmed={isDimmed}
              />
            );
          })}
        </div>

        <Separator />

        {/* Payment Breakdown */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center justify-between py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              결제 내역 상세 보기
              <ChevronDown className="size-4" />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col gap-2 pt-2">
              {template.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-sm"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{payment.title}</span>
                    {payment.payer && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span
                          className="inline-block size-2 rounded-full"
                          style={{ backgroundColor: payment.payer.tagColor }}
                        />
                        {payment.payer.name} 결제
                      </span>
                    )}
                  </div>
                  <span className="font-medium tabular-nums">
                    {formatKRW(payment.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </main>

      {/* Bottom CTA Banner */}
      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-lg border-t bg-secondary p-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-secondary-foreground">
            나도 정산 쉽게 하고 싶다면
          </p>
          <Link
            href="/"
            className="w-full rounded-md bg-primary px-6 py-2.5 text-center text-sm font-medium text-primary-foreground"
          >
            {BRAND.name} 시작하기
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Settlement Card (read-only, with highlight support) ──

interface ShareSettlementCardProps {
  name: string;
  tagColor: string;
  paymentTotal: number;
  tossTotal: number;
  receiveTotal: number;
  sendList: Record<string, number>;
  isSelected: boolean;
  isDimmed: boolean;
}

function ShareSettlementCard({
  name,
  tagColor,
  paymentTotal,
  tossTotal,
  receiveTotal,
  sendList,
  isSelected,
  isDimmed,
}: ShareSettlementCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const nonZeroSendEntries = Object.entries(sendList).filter(
    ([, amount]) => Math.floor(amount) > 0,
  );

  const hasSendItems = nonZeroSendEntries.length > 0;

  return (
    <Card
      className={`overflow-hidden border-l-4 py-4 transition-opacity duration-200 ${
        isDimmed ? "opacity-40" : ""
      } ${isSelected ? "ring-2 ring-primary/30" : ""}`}
      style={{ borderLeftColor: tagColor }}
    >
      <Collapsible open={isOpen || isSelected} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild disabled={!hasSendItems}>
          <button
            type="button"
            className="w-full text-left disabled:cursor-default"
          >
            <CardContent className="flex items-center justify-between gap-3 py-0">
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: tagColor }}
                  />
                  <span className="font-semibold">{name}</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm tabular-nums">
                  {paymentTotal > 0 && (
                    <span className="text-muted-foreground">
                      결제 금액: {formatKRW(paymentTotal)}
                    </span>
                  )}
                  {tossTotal > 0 && (
                    <span className="font-medium text-destructive">
                      보낼 돈: {formatKRW(tossTotal)}
                    </span>
                  )}
                  {receiveTotal > 0 && (
                    <span className="font-medium text-success">
                      받을 돈: {formatKRW(receiveTotal)}
                    </span>
                  )}
                </div>
              </div>

              {hasSendItems && (
                <ChevronDown
                  className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180"
                  data-state={isOpen || isSelected ? "open" : "closed"}
                />
              )}
            </CardContent>
          </button>
        </CollapsibleTrigger>

        {hasSendItems && (
          <CollapsibleContent>
            <div className="mt-3 border-t px-6 pt-3">
              <ul className="space-y-2">
                {nonZeroSendEntries.map(([receiver, amount]) => (
                  <li
                    key={receiver}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <ArrowRight className="size-3.5 shrink-0 text-destructive" />
                    <span>
                      <span className="font-medium text-foreground">
                        {receiver}
                      </span>
                      에게{" "}
                      <span className="font-medium text-destructive tabular-nums">
                        {formatKRW(Math.floor(amount))}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>
    </Card>
  );
}
