# localStorage → tRPC + Supabase Anonymous Auth 전환

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 프론트엔드를 localStorage에서 tRPC API(Supabase DB)로 전환하고, Supabase Anonymous Auth로 비로그인 유저를 지원하며, Vercel 배포 가능 상태로 만든다.

**Architecture:** Supabase Anonymous Auth로 첫 방문 시 자동 세션 생성 → tRPC `protectedProcedure` 그대로 활용 → 프론트엔드 hooks를 tRPC query/mutation으로 교체 → localStorage store 삭제. Anonymous → 정식 계정 전환 시 `linkIdentity`로 데이터 승계.

**Tech Stack:** Next.js 15, tRPC v11, Supabase Auth (anonymous), Drizzle ORM, TanStack Query

---

## Task 1: Supabase Anonymous Auth + Next.js Middleware 연결

**Files:**
- Create: `apps/web/src/middleware.ts`
- Create: `apps/web/src/lib/supabase/auth.ts`
- Modify: `apps/web/src/app/layout.tsx`
- Modify: `apps/web/src/app/(app)/layout.tsx`

**Step 1: Next.js middleware 생성**

`apps/web/src/middleware.ts`:
```typescript
import { type NextRequest } from "next/server";

import { updateSession } from "~/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

**Step 2: Anonymous Auth 유틸 생성**

`apps/web/src/lib/supabase/auth.ts`:
```typescript
"use client";

import { createClient } from "./client";

export async function ensureSession() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
  }
}
```

**Step 3: AuthProvider 생성 & root layout에 연결**

`apps/web/src/components/auth/auth-provider.tsx`:
```typescript
"use client";

import { useEffect } from "react";

import { ensureSession } from "~/lib/supabase/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void ensureSession();
  }, []);

  return <>{children}</>;
}
```

`apps/web/src/app/(app)/layout.tsx`에 `TRPCReactProvider` + `AuthProvider` 래핑:
```typescript
import { TRPCReactProvider } from "~/trpc/react";
import { AuthProvider } from "~/components/auth/auth-provider";
// ... existing imports

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <AuthProvider>
        <AppHeader />
        <main className="container mx-auto min-h-screen pb-16 pt-14 lg:pb-0">
          {children}
        </main>
        <MobileNav />
      </AuthProvider>
    </TRPCReactProvider>
  );
}
```

**Step 4: 빌드 확인**

Run: `cd apps/web && pnpm build`
Expected: 빌드 성공 (아직 tRPC 호출 안 하므로 기능 변화 없음)

**Step 5: 커밋**

```bash
git add apps/web/src/middleware.ts apps/web/src/lib/supabase/auth.ts apps/web/src/components/auth/auth-provider.tsx apps/web/src/app/\(app\)/layout.tsx
git commit -m "feat: Supabase Anonymous Auth 세팅 + middleware 연결"
```

---

## Task 2: tRPC 라우터 조정 (anonymous 유저 지원)

**Files:**
- Modify: `packages/api/src/router/template.ts`
- Modify: `packages/api/src/router/participant.ts`
- Modify: `packages/api/src/router/payment.ts`

현재 라우터에서 변경이 필요한 부분:
- `template.byId`가 public인데, 소유자만 쓸 수 있어야 함 → protected로 전환 + 소유 검증
- `participant.list`가 protected이지만 `template/[id]` 페이지에서 쓰이는 방식 고려
- `template.byId`는 participants, payments를 with로 포함하므로 이것만으로 상세 페이지 데이터 충분

**Step 1: template.byId에 소유 검증 추가**

`packages/api/src/router/template.ts`의 `byId`를 `protectedProcedure`로 변경하고 소유 검증:
```typescript
byId: protectedProcedure
  .input(z.object({ id: z.string().uuid() }))
  .query(({ ctx, input }) => {
    return ctx.db.query.templates.findFirst({
      where: and(eq(templates.id, input.id), eq(templates.userId, ctx.user.id)),
      with: {
        participants: true,
        payments: {
          with: {
            participants: true,
          },
        },
      },
    });
  }),
```

**Step 2: payment.create 수정 - paymentParticipants 관계 반환**

현재 `payment.create`가 payment만 반환하고 participants 관계를 안 반환함. 프론트에서 캐시 invalidation으로 처리할 것이므로 현재 그대로 유지.

**Step 3: 커밋**

```bash
git add packages/api/src/router/template.ts
git commit -m "feat: template.byId에 소유 검증 추가"
```

---

## Task 3: 프론트엔드 타입 정의 (DB 타입 → 컴포넌트 타입)

**Files:**
- Create: `apps/web/src/lib/types.ts`

DB에서 오는 데이터 타입과 컴포넌트가 기대하는 타입 간의 브릿지. `LocalTemplate`, `LocalParticipant`, `LocalPayment`를 tRPC 응답 타입 기반으로 재정의.

**Step 1: 타입 정의**

`apps/web/src/lib/types.ts`:
```typescript
import type { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@naran/api";

type RouterOutput = inferRouterOutputs<AppRouter>;

/** template.byId 응답 타입 */
export type Template = NonNullable<RouterOutput["template"]["byId"]>;

/** DB Participant 타입 */
export type Participant = Template["participants"][number];

/** DB Payment 타입 (with participants 관계 포함) */
export type Payment = Template["payments"][number];

/** template.list 응답의 개별 아이템 */
export type TemplateSummary = RouterOutput["template"]["list"][number];

/** settlement.calculate 응답 */
export type SettlementResult = NonNullable<RouterOutput["settlement"]["calculate"]>;
```

**Step 2: 커밋**

```bash
git add apps/web/src/lib/types.ts
git commit -m "feat: tRPC 응답 기반 프론트엔드 타입 정의"
```

---

## Task 4: Dashboard 페이지 tRPC 전환

**Files:**
- Modify: `apps/web/src/app/(app)/dashboard/page.tsx`
- Modify: `apps/web/src/components/template/template-card.tsx`

**Step 1: dashboard/page.tsx를 tRPC로 전환**

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Users } from "lucide-react";

import { useTRPC } from "~/trpc/react";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { TemplateCard } from "~/components/template/template-card";

export default function DashboardPage() {
  const router = useRouter();
  const trpc = useTRPC();

  const { data: templates } = useSuspenseQuery(trpc.template.list.queryOptions());

  const deleteMutation = useMutation(trpc.template.delete.mutationOptions({
    onSuccess: () => {
      // queryClient invalidation은 TanStack Query의 queryKey로 자동 처리
    },
  }));

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

  // ... 나머지 JSX 동일 (templates 사용하는 부분은 그대로)
}
```

주의: `useSuspenseQuery` 사용하므로 Suspense boundary 필요 → `loading.tsx` 생성 필요.

**Step 2: template-card.tsx 타입 변경**

`LocalTemplate` → `TemplateSummary` 타입으로 변경. `TemplateSummary`는 payments/participants를 포함하지 않으므로, `template.list` 응답에 맞게 카드 UI 조정 필요.

현재 `template.list` 라우터가 participants/payments를 포함하지 않으므로, 라우터를 수정하거나 카드에서 표시할 정보를 줄임.

**Option: template.list에 with 추가** (라우터 수정)

`packages/api/src/router/template.ts`의 `list`:
```typescript
list: protectedProcedure.query(({ ctx }) => {
  return ctx.db.query.templates.findMany({
    where: eq(templates.userId, ctx.user.id),
    orderBy: desc(templates.createdAt),
    with: {
      participants: true,
      payments: true,
    },
  });
}),
```

**Step 3: template-card.tsx import 변경**

```typescript
import type { Template } from "~/lib/types";
// Template 대신 list에서 내려오는 타입을 직접 사용
```

participants/payments 포함된 list 응답의 타입을 활용.

**Step 4: Suspense loading 컴포넌트 생성**

`apps/web/src/app/(app)/dashboard/loading.tsx`:
```typescript
export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      <div className="h-8 w-24 animate-pulse rounded bg-muted" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}
```

**Step 5: 빌드 확인**

Run: `cd apps/web && pnpm build`

**Step 6: 커밋**

```bash
git add apps/web/src/app/\(app\)/dashboard/ apps/web/src/components/template/template-card.tsx packages/api/src/router/template.ts
git commit -m "feat: Dashboard 페이지 tRPC 전환"
```

---

## Task 5: Template 생성 페이지 tRPC 전환

**Files:**
- Modify: `apps/web/src/app/(app)/template/new/page.tsx`

**Step 1: createTemplate + addParticipant을 tRPC mutation으로 전환**

핵심 변경:
- `createTemplate(name)` → `trpc.template.create.mutate({ name })`
- `addParticipant(templateId, name)` → `trpc.participant.create.mutate({ templateId, name, tagColor })`
- 생성은 async로 변경 (DB 저장이므로)
- `template.create`가 UUID를 반환하므로 redirect에 사용

```typescript
async function handleCreate(redirectTo: "template" | "dashboard") {
  if (isCreating) return;
  setIsCreating(true);

  try {
    const [template] = await createMutation.mutateAsync({ name: name.trim() });

    if (template) {
      for (const p of participants) {
        await addParticipantMutation.mutateAsync({
          templateId: template.id,
          name: p.name,
          tagColor: p.tagColor,
        });
      }

      if (redirectTo === "dashboard") {
        router.push("/dashboard");
      } else {
        router.push(`/template/${template.id}`);
      }
    }
  } catch {
    toast.error("모임 생성에 실패했어요");
    setIsCreating(false);
  }
}
```

**Step 2: 빌드 확인**

**Step 3: 커밋**

```bash
git add apps/web/src/app/\(app\)/template/new/page.tsx
git commit -m "feat: Template 생성 페이지 tRPC 전환"
```

---

## Task 6: Template 상세 페이지 tRPC 전환

**Files:**
- Modify: `apps/web/src/app/(app)/template/[id]/page.tsx`
- Modify: `apps/web/src/components/participant/participant-list.tsx`
- Modify: `apps/web/src/components/payment/payment-list.tsx`
- Modify: `apps/web/src/components/payment/payment-card.tsx`
- Modify: `apps/web/src/components/payment/payment-drawer.tsx`
- Modify: `apps/web/src/components/payment/add-payment-form.tsx`
- Modify: `apps/web/src/components/settlement/settlement-view.tsx`
- Modify: `apps/web/src/components/settlement/share-button.tsx`

**Step 1: template/[id]/page.tsx 전환**

`useTemplate(id)` hook을 tRPC query + mutation으로 교체:

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { useTRPC } from "~/trpc/react";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
// ... UI imports

export default function TemplatePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const currentTab = searchParams.get("tab") ?? "payments";

  const { data: template } = useSuspenseQuery(
    trpc.template.byId.queryOptions({ id })
  );

  const invalidateTemplate = () => {
    queryClient.invalidateQueries({ queryKey: trpc.template.byId.queryKey({ id }) });
  };

  const addParticipantMutation = useMutation(
    trpc.participant.create.mutationOptions({ onSuccess: invalidateTemplate })
  );
  const removeParticipantMutation = useMutation(
    trpc.participant.delete.mutationOptions({ onSuccess: invalidateTemplate })
  );
  const addPaymentMutation = useMutation(
    trpc.payment.create.mutationOptions({ onSuccess: invalidateTemplate })
  );
  const removePaymentMutation = useMutation(
    trpc.payment.delete.mutationOptions({ onSuccess: invalidateTemplate })
  );

  // ... 나머지 JSX
}
```

**Step 2: 컴포넌트 타입 변경**

모든 하위 컴포넌트의 `LocalParticipant`, `LocalPayment`, `LocalTemplate` 타입을 `~/lib/types`의 DB 타입으로 교체.

주요 차이점:
- `LocalPayment.participantIds: string[]` → `Payment.participants: { paymentId, participantId }[]`
- `payment-card.tsx`: `payment.participantIds.length` → `payment.participants.length`

**Step 3: settlement-view.tsx 전환**

`getSettlementInput(template)` 유틸 대신 tRPC `settlement.calculate` query 사용:

```typescript
const { data: settlementData } = useSuspenseQuery(
  trpc.settlement.calculate.queryOptions({ templateId: template.id })
);
```

또는 기존처럼 클라이언트에서 계산하되 DB 타입에 맞게 변환 함수 수정.

**Step 4: share-button.tsx 전환**

`getSettlementInput` 의존 제거, DB 타입 기반으로 settlement 텍스트 빌드.

**Step 5: loading.tsx 생성**

`apps/web/src/app/(app)/template/[id]/loading.tsx`

**Step 6: 빌드 확인**

**Step 7: 커밋**

```bash
git add apps/web/src/app/\(app\)/template/ apps/web/src/components/
git commit -m "feat: Template 상세 페이지 + 하위 컴포넌트 tRPC 전환"
```

---

## Task 7: 공유 페이지 tRPC 전환

**Files:**
- Modify: `apps/web/src/app/share/[token]/page.tsx`
- Modify: `apps/web/src/app/share/[token]/share-page-content.tsx`
- Delete: `apps/web/src/app/share/[token]/mock-data.ts`

**Step 1: page.tsx에서 tRPC server caller 사용**

```typescript
import { trpc } from "~/trpc/server";

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params;

  try {
    const data = await trpc.sharedLink.resolve({ token });
    return <SharePageContent data={data} />;
  } catch {
    return <NotFoundUI />;
  }
}
```

**Step 2: share-page-content.tsx DB 타입 적용**

`LocalTemplate` → `Template` 타입. `getSettlementInput` → DB 데이터에서 직접 계산.

**Step 3: mock-data.ts 삭제**

**Step 4: 커밋**

```bash
git add apps/web/src/app/share/
git commit -m "feat: 공유 페이지 tRPC 전환 (mock 데이터 삭제)"
```

---

## Task 8: localStorage store 코드 삭제

**Files:**
- Delete: `apps/web/src/lib/store/store.ts`
- Delete: `apps/web/src/lib/store/hooks.ts`
- Delete: `apps/web/src/lib/store/types.ts`
- Delete: `apps/web/src/lib/store/constants.ts`
- Delete: `apps/web/src/lib/store/index.ts`
- Delete: `apps/web/src/hooks/use-template.ts`
- Delete: `apps/web/src/hooks/use-templates.ts`
- Delete: `apps/web/src/hooks/use-settlement.ts`
- Modify: `apps/web/src/lib/constants.ts` (STORAGE_KEYS 제거)

**Step 1: store 디렉토리 삭제**

```bash
rm -rf apps/web/src/lib/store/
rm apps/web/src/hooks/use-template.ts apps/web/src/hooks/use-templates.ts apps/web/src/hooks/use-settlement.ts
```

**Step 2: constants.ts에서 STORAGE_KEYS 제거**

**Step 3: 빌드 확인 (import 에러 없는지)**

Run: `cd apps/web && pnpm build`

**Step 4: 커밋**

```bash
git add -A
git commit -m "chore: localStorage store 코드 제거"
```

---

## Task 9: Anonymous → 정식 계정 마이그레이션 (linkIdentity)

**Files:**
- Modify: `apps/web/src/lib/supabase/auth.ts`

**Step 1: linkIdentity 유틸 추가**

```typescript
export async function linkAnonymousToProvider(
  provider: "google" | "kakao" | "apple",
  redirectTo: string,
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.is_anonymous) {
    return { error: null, alreadyLinked: true };
  }

  const { data, error } = await supabase.auth.linkIdentity({
    provider,
    options: { redirectTo },
  });

  return { data, error, alreadyLinked: false };
}
```

**Step 2: isAnonymous 확인 유틸**

```typescript
export async function getAuthStatus() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return {
    isAuthenticated: !!user,
    isAnonymous: user?.is_anonymous ?? false,
    user,
  };
}
```

**Step 3: 커밋**

```bash
git add apps/web/src/lib/supabase/auth.ts
git commit -m "feat: anonymous → 정식 계정 마이그레이션 유틸 (linkIdentity)"
```

---

## Task 10: Vercel 배포 설정

**Files:**
- Create: `apps/web/vercel.json` (필요시)

**Step 1: 빌드 전체 확인**

```bash
pnpm build
```

**Step 2: Vercel 프로젝트 설정 확인사항**

Vercel 대시보드에서:
- Root Directory: `apps/web`
- Framework: Next.js (자동 감지)
- Build Command: `cd ../.. && pnpm build --filter=@naran/web`
- 환경변수:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `POSTGRES_URL`

**Step 3: Supabase 대시보드 확인사항**

- Authentication → Settings → Anonymous Sign-ins: **Enable**
- Site URL: Vercel 배포 URL로 설정

**Step 4: 커밋**

```bash
git commit -m "chore: Vercel 배포 설정 확인"
```
