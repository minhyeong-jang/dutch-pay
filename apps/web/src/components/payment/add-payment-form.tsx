"use client";

import { useState } from "react";
import { CheckIcon } from "lucide-react";

import type { LocalParticipant } from "~/lib/store";
import { formatNumber } from "~/lib/format";
import { cn } from "~/lib/utils";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

interface AddPaymentFormProps {
  participants: LocalParticipant[];
  onSubmit: (data: {
    title: string;
    amount: number;
    payerId: string;
    participantIds: string[];
  }) => void;
  onClose: () => void;
}

const QUICK_AMOUNTS = [
  { label: "+1천", value: 1_000 },
  { label: "+5천", value: 5_000 },
  { label: "+1만", value: 10_000 },
  { label: "+5만", value: 50_000 },
] as const;

export function AddPaymentForm({
  participants,
  onSubmit,
  onClose,
}: AddPaymentFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [payerId, setPayerId] = useState("");
  const [participantIds, setParticipantIds] = useState<string[]>(
    participants.map((p) => p.id),
  );

  const displayAmount = amount > 0 ? formatNumber(amount) : "";

  const allSelected = participantIds.length === participants.length;
  const isValid =
    title.trim().length > 0 &&
    amount > 0 &&
    payerId !== "" &&
    participantIds.length > 0;

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setAmount(raw ? parseInt(raw, 10) : 0);
  }

  function addQuickAmount(value: number) {
    setAmount((prev) => prev + value);
  }

  function toggleParticipant(id: string) {
    setParticipantIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id],
    );
  }

  function toggleAll() {
    if (allSelected) {
      setParticipantIds([]);
    } else {
      setParticipantIds(participants.map((p) => p.id));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    onSubmit({
      title: title.trim(),
      amount,
      payerId,
      participantIds,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* 사용처 */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="payment-title">사용처</Label>
        <Input
          id="payment-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: 점심 식사"
        />
      </div>

      {/* 금액 */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="payment-amount">금액</Label>
        <div className="relative">
          <Input
            id="payment-amount"
            inputMode="numeric"
            value={displayAmount}
            onChange={handleAmountChange}
            placeholder="0"
            className="pr-8"
          />
          <span className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm">
            원
          </span>
        </div>
        <div className="flex gap-2">
          {QUICK_AMOUNTS.map((q) => (
            <Button
              key={q.value}
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => addQuickAmount(q.value)}
            >
              {q.label}
            </Button>
          ))}
        </div>
      </div>

      {/* 결제자 */}
      <div className="flex flex-col gap-1.5">
        <Label>결제자</Label>
        <div className="flex flex-wrap gap-2">
          {participants.map((p) => {
            const isSelected = payerId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPayerId(p.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-border hover:bg-accent text-muted-foreground",
                )}
              >
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: p.tagColor }}
                />
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 참여자 */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label>참여자</Label>
          <button
            type="button"
            onClick={toggleAll}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition-colors"
          >
            <span
              className={cn(
                "flex size-4 items-center justify-center rounded border transition-colors",
                allSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input",
              )}
            >
              {allSelected && <CheckIcon className="size-3" />}
            </span>
            전체 선택
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {participants.map((p) => {
            const isSelected = participantIds.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => toggleParticipant(p.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
                  isSelected
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-border hover:bg-accent text-muted-foreground",
                )}
              >
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: p.tagColor }}
                />
                {p.name}
                {isSelected && <CheckIcon className="size-3" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 제출 */}
      <Button type="submit" className="w-full" disabled={!isValid}>
        추가하기
      </Button>
    </form>
  );
}
