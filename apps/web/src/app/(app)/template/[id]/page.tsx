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
import { SettlementView } from "~/components/settlement/settlement-view";

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
    <div className="flex flex-col gap-4 py-4">
      {/* 모임 이름 + 참가자 */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{template.name}</h1>
        <ParticipantList
          participants={template.participants}
          onAdd={addMember}
          onRemove={removeMember}
        />
      </div>

      {/* ── Mobile: 탭 레이아웃 ── */}
      <div className="lg:hidden">
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
            <SettlementView template={template} />
          </TabsContent>
        </Tabs>
      </div>

      {/* ── Desktop: 2단 레이아웃 ── */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-2">
        {/* 좌측: 결제 내역 */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">결제 내역</h2>
            <Button
              size="sm"
              onClick={() => setPaymentDrawerOpen(true)}
            >
              <PlusIcon className="size-4" />
              결제 추가
            </Button>
          </div>
          <PaymentList
            payments={template.payments}
            participants={template.participants}
            onDelete={removePaymentItem}
          />
        </section>

        {/* 우측: 정산 결과 (스크롤 시 sticky) */}
        <section className="lg:sticky lg:top-[4.5rem] lg:self-start">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">정산 결과</h2>
            <SettlementView template={template} />
          </div>
        </section>
      </div>

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
