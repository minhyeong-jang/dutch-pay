"use client";

import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

import {
  calculateSettlement

} from "@dutch/core";
import type {SettlementResult} from "@dutch/core";
import { Button } from "~/components/ui/button";
import { formatKRW } from "~/lib/format";
import type { Template } from "~/lib/types";

interface ShareButtonProps {
  template: Template;
}

function buildSettlementText(template: Template): string {
  const participantNames = template.participants.map((p) => p.name);

  const payments = template.payments
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
    });

  if (participantNames.length === 0 || payments.length === 0) {
    return "";
  }

  const settlement: SettlementResult = calculateSettlement(
    participantNames,
    payments,
  );

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const lines: string[] = [];

  lines.push(`[${template.name} 정산 결과]`);
  lines.push(`총 ${formatKRW(totalAmount)} (${participantNames.length}명)`);
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

  return lines.join("\n");
}

export function ShareButton({ template }: ShareButtonProps) {
  const handleCopyText = async () => {
    const text = buildSettlementText(template);

    if (!text) {
      toast.error("정산할 내역이 없어요");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast.success("복사되었어요");
    } catch {
      toast.error("복사에 실패했어요");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("복사되었어요");
    } catch {
      toast.error("복사에 실패했어요");
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyText}
        className="flex-1"
      >
        <Copy />
        텍스트 복사
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="flex-1"
      >
        <Share2 />
        링크 복사
      </Button>
    </div>
  );
}
