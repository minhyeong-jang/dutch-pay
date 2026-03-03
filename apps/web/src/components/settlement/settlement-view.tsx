"use client";

import { useMemo } from "react";

import {
  calculateSettlement,
  calculateReceiveSummary,
  countDirectTransfers,
  countOptimizedTransfers,
} from "@naran/core";
import type { Template } from "~/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { SettlementDetail } from "./settlement-detail";
import { SettlementSummary } from "./settlement-summary";
import { ShareButton } from "./share-button";

interface SettlementViewProps {
  template: Template;
}

export function SettlementView({ template }: SettlementViewProps) {
  const participantNames = useMemo(
    () => template.participants.map((p) => p.name),
    [template.participants],
  );

  const payments = useMemo(
    () =>
      template.payments
        .filter((p) => p.payerId && p.participants.length > 0 && p.amount > 0)
        .map((p) => {
          const payer = template.participants.find((pt) => pt.id === p.payerId);
          return {
            amount: p.amount,
            payerName: payer?.name ?? "",
            participantNames: p.participants
              .map((pp) => template.participants.find((pt) => pt.id === pp.participantId)?.name)
              .filter((n): n is string => !!n),
          };
        }),
    [template.payments, template.participants],
  );

  const settlement = useMemo(
    () => calculateSettlement(participantNames, payments),
    [participantNames, payments],
  );

  const receiveSummary = useMemo(
    () => calculateReceiveSummary(participantNames, settlement),
    [participantNames, settlement],
  );

  const totalAmount = receiveSummary.totalPrice ?? 0;
  const participantMap = useMemo(
    () => new Map(template.participants.map((p) => [p.name, p.tagColor])),
    [template.participants],
  );

  // 결제 내역이 없는 경우
  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <p className="text-lg font-medium text-muted-foreground">
          결제 내역을 먼저 추가해주세요
        </p>
        <p className="text-sm text-muted-foreground/70">
          결제를 추가하면 정산 결과가 여기에 표시됩니다
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 요약 카드 */}
      <SettlementSummary
        totalAmount={totalAmount}
        participantCount={template.participants.length}
        paymentCount={template.payments.length}
        directTransferCount={countDirectTransfers(payments)}
        optimizedTransferCount={countOptimizedTransfers(settlement)}
      />

      {/* 공유 버튼 */}
      <ShareButton template={template} />

      {/* 탭: 각자 송금 / 일괄 송금 */}
      <Tabs defaultValue="individual">
        <TabsList className="w-full">
          <TabsTrigger value="individual" className="flex-1">
            각자 송금
          </TabsTrigger>
          <TabsTrigger value="batch" className="flex-1">
            일괄 송금
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual">
          <div className="flex flex-col gap-3 pt-2">
            {participantNames.map((name) => {
              const entry = settlement[name];
              if (!entry) return null;

              const receiveTotal =
                typeof receiveSummary[name] === "number"
                  ? receiveSummary[name]
                  : 0;

              return (
                <SettlementDetail
                  key={name}
                  name={name}
                  tagColor={participantMap.get(name) ?? "#64748B"}
                  paymentTotal={entry.paymentTotal}
                  tossTotal={entry.tossTotal}
                  receiveTotal={receiveTotal}
                  sendList={entry.sendList}
                />
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="batch">
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <p className="text-muted-foreground">준비 중인 기능이에요</p>
            <p className="text-sm text-muted-foreground/70">
              한 명에게 모아서 송금하는 기능을 곧 제공할 예정이에요
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
