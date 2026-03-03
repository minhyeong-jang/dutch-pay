"use client";

import { useState } from "react";
import { Trash2Icon, UsersIcon } from "lucide-react";

import type { Participant, Payment } from "~/lib/types";
import { formatKRW } from "~/lib/format";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

interface PaymentCardProps {
  payment: Payment;
  participants: Participant[];
  onDelete: (id: string) => void;
}

export function PaymentCard({
  payment,
  participants,
  onDelete,
}: PaymentCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const payer = participants.find((p) => p.id === payment.payerId);

  return (
    <>
      <Card className="gap-0 py-3">
        <CardContent className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">{payment.title}</p>
            <p className="text-base font-semibold tabular-nums">{formatKRW(payment.amount)}</p>
            <div className="flex items-center gap-2">
              {payer && (
                <div className="flex items-center gap-1 text-xs">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: payer.tagColor }}
                  />
                  <span className="text-muted-foreground">{payer.name}</span>
                </div>
              )}
              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                <UsersIcon className="size-3" />
                <span>{payment.participants.length}명</span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setConfirmOpen(true)}
            aria-label="결제 삭제"
          >
            <Trash2Icon className="text-muted-foreground size-4" />
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>결제 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 결제 내역을 삭제할까요?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => onDelete(payment.id)}
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
