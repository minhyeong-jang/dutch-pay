"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

import { Card, CardContent } from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { formatKRW } from "~/lib/format";

interface SettlementDetailProps {
  name: string;
  tagColor: string;
  paymentTotal: number;
  tossTotal: number;
  receiveTotal: number;
  sendList: Record<string, number>;
}

export function SettlementDetail({
  name,
  tagColor,
  paymentTotal,
  tossTotal,
  receiveTotal,
  sendList,
}: SettlementDetailProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 0원이 아닌 항목만 필터링
  const nonZeroSendEntries = Object.entries(sendList).filter(
    ([, amount]) => Math.floor(amount) > 0,
  );

  const hasSendItems = nonZeroSendEntries.length > 0;

  return (
    <Card
      className="overflow-hidden border-l-4 py-4"
      style={{ borderLeftColor: tagColor }}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild disabled={!hasSendItems}>
          <button
            type="button"
            className="w-full text-left disabled:cursor-default"
          >
            <CardContent className="flex items-center justify-between gap-3 py-0">
              <div className="flex-1 space-y-1.5">
                {/* 참가자 이름 */}
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: tagColor }}
                  />
                  <span className="font-semibold">{name}</span>
                </div>

                {/* 결제 금액 / 보내야 할 금액 */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
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

              {/* 확장 아이콘 */}
              {hasSendItems && (
                <ChevronDown
                  className="size-5 shrink-0 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180"
                  data-state={isOpen ? "open" : "closed"}
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
                      <span className="font-medium text-destructive">
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
