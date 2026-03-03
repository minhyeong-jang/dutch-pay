"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Users } from "lucide-react";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "~/trpc/react";
import { Button } from "~/components/ui/button";
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
import { TemplateCard } from "~/components/template/template-card";

export function DashboardContent() {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data: templates } = useSuspenseQuery(trpc.template.list.queryOptions());
  const deleteMutation = useMutation(
    trpc.template.delete.mutationOptions({
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: trpc.template.list.queryKey() });
      },
    })
  );
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const templateToDelete = deleteTarget
    ? templates.find((t) => t.id === deleteTarget)
    : null;

  function handleConfirmDelete() {
    if (deleteTarget) {
      deleteMutation.mutate(deleteTarget);
      setDeleteTarget(null);
    }
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">내 모임</h1>
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <Link href="/template/new">
            <Plus className="size-4" />
            새 모임
          </Link>
        </Button>
      </div>

      {/* Template grid or empty state */}
      {templates.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-muted">
            <Users className="size-8 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-medium">아직 모임이 없어요</p>
            <p className="text-sm text-muted-foreground">
              여러 명이 각각 결제한 복수 건을 한 번에 정산할 수 있어요
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/template/new">
              <Plus className="size-4" />
              첫 모임 만들기
            </Link>
          </Button>
          <div className="mt-2 flex flex-col gap-2 text-xs text-muted-foreground">
            <p>회식 1차/2차/3차, 여행 경비, 동호회 회비 등</p>
            <p>로그인 없이 바로 사용 가능</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      {/* FAB for mobile */}
      {templates.length > 0 && (
        <Button
          size="icon-lg"
          className="fixed bottom-20 right-6 z-30 size-14 rounded-full shadow-xl lg:bottom-6 sm:hidden"
          onClick={() => router.push("/template/new")}
        >
          <Plus className="size-6" />
          <span className="sr-only">새 모임 만들기</span>
        </Button>
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
      >
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>모임을 삭제할까요?</AlertDialogTitle>
            <AlertDialogDescription>
              {templateToDelete
                ? `"${templateToDelete.name}" 모임의 모든 결제 내역과 정산 결과가 삭제됩니다. 이 작업은 되돌릴 수 없습니다.`
                : "이 모임의 모든 데이터가 삭제됩니다."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
