"use client";

import type { LocalParticipant } from "~/lib/store";
import { useMediaQuery } from "~/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "~/components/ui/drawer";
import { ScrollArea } from "~/components/ui/scroll-area";
import { AddPaymentForm } from "~/components/payment/add-payment-form";

interface PaymentDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participants: LocalParticipant[];
  onSubmit: (data: {
    title: string;
    amount: number;
    payerId: string;
    participantIds: string[];
  }) => void;
}

export function PaymentDrawer({
  open,
  onOpenChange,
  participants,
  onSubmit,
}: PaymentDrawerProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>결제 추가</DialogTitle>
            <DialogDescription>
              결제 정보를 입력해 주세요
            </DialogDescription>
          </DialogHeader>
          <AddPaymentForm
            participants={participants}
            onSubmit={onSubmit}
            onClose={() => onOpenChange(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>결제 추가</DrawerTitle>
          <DrawerDescription>
            결제 정보를 입력해 주세요
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="overflow-y-auto px-4 pb-8">
          <AddPaymentForm
            participants={participants}
            onSubmit={onSubmit}
            onClose={() => onOpenChange(false)}
          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
