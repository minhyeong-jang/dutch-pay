"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { useTemplate } from "~/hooks/use-template";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ParticipantList } from "~/components/participant/participant-list";
import { PaymentList } from "~/components/payment/payment-list";
import { PaymentDrawer } from "~/components/payment/payment-drawer";

export default function TemplatePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") ?? "payments";
  const { template, addMember, removeMember, addPaymentItem, removePaymentItem } =
    useTemplate(id);

  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false);

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
        <p className="text-muted-foreground text-lg">모임을 찾을 수 없어요</p>
        <Button variant="outline" asChild>
          <Link href="/dashboard">대시보드로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  function handleTabChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "payments") {
      params.delete("tab");
    } else {
      params.set("tab", value);
    }
    const qs = params.toString();
    router.replace(`?${qs}`, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {/* 참가자 바 */}
      <ParticipantList
        participants={template.participants}
        onAdd={addMember}
        onRemove={removeMember}
      />

      {/* 탭 */}
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList className="w-full">
          <TabsTrigger value="payments" className="flex-1">
            결제 내역
          </TabsTrigger>
          <TabsTrigger value="settlement" className="flex-1">
            정산 결과
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="mt-4">
          <div className="flex flex-col gap-4">
            <PaymentList
              payments={template.payments}
              participants={template.participants}
              onDelete={removePaymentItem}
            />

            <Button
              className="w-full"
              onClick={() => setPaymentDrawerOpen(true)}
            >
              <PlusIcon className="size-4" />
              결제 추가
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="settlement" className="mt-4">
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <p className="text-muted-foreground">정산 결과가 여기에 표시됩니다</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* 결제 추가 드로어/다이얼로그 */}
      <PaymentDrawer
        open={paymentDrawerOpen}
        onOpenChange={setPaymentDrawerOpen}
        participants={template.participants}
        onSubmit={(data) => {
          addPaymentItem(data);
          setPaymentDrawerOpen(false);
        }}
      />
    </div>
  );
}
