"use client";

import { ReceiptIcon } from "lucide-react";

import type { Participant, Payment } from "~/lib/types";
import { PaymentCard } from "~/components/payment/payment-card";

interface PaymentListProps {
  payments: Payment[];
  participants: Participant[];
  onDelete: (id: string) => void;
}

export function PaymentList({
  payments,
  participants,
  onDelete,
}: PaymentListProps) {
  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <ReceiptIcon className="text-muted-foreground size-10" />
        <p className="text-muted-foreground font-medium">
          아직 결제 내역이 없어요
        </p>
        <p className="text-muted-foreground text-sm">
          결제 내역을 추가하면 자동으로 정산돼요
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {payments.map((payment) => (
        <PaymentCard
          key={payment.id}
          payment={payment}
          participants={participants}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
