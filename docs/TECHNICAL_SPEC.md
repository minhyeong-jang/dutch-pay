# CalPayment Web App - Technical Architecture Document

**Author**: Frontend Developer 1 (Tech Lead)
**Date**: 2026-02-23
**Status**: Decision Record - Follow this.

---

## 1. Current State Audit

### What's Already Set Up and Working

| Layer | Status | Details |
|-------|--------|---------|
| Monorepo infra | Done | Turborepo + pnpm workspaces, `@naran/*` namespacing |
| Next.js 16 shell | Done | App Router, React 19, root layout with `lang="ko"`, Geist fonts, TRPCReactProvider wrapping |
| Tailwind CSS v4 | Done | CSS-first config via `@naran/tailwind-config/theme`, oklch color tokens (light/dark), `tw-animate-css`, custom container utility |
| tRPC v11 (server) | Done | `createTRPCOptionsProxy` with RSC prefetch pattern, `HydrateClient`, `prefetch()` helper |
| tRPC v11 (client) | Done | `httpBatchStreamLink`, `TRPCReactProvider` with singleton QueryClient, 30s staleTime |
| tRPC API route | Done | `/api/trpc/[trpc]/route.ts` with CORS headers, Supabase auth integration |
| API routers | Done | `template`, `payment`, `settlement` routers with full CRUD |
| Supabase Auth | Done | Server client (cookies), browser client, middleware session refresh |
| DB layer | Done | Drizzle ORM with full schema: templates, participants, payments, payment_participants, shared_links |
| Core business logic | Done | `calculateSettlement()`, `calculateReceiveSummary()` as pure functions |
| Zod validators | Done | `createTemplateSchema`, `paymentSchema`, `participantSchema` in `@naran/core` |
| Env validation | Done | `@t3-oss/env-nextjs` with typed server/client env vars |

### What's Missing for a Functional Web App

| Gap | Priority | Notes |
|-----|----------|-------|
| **shadcn/ui components** | P0 | No `components.json`, no UI components at all. Just a bare `<h1>` on the page. |
| **Routing structure** | P0 | Only root `page.tsx` exists. No dashboard, template detail, auth, or share pages. |
| **middleware.ts** | P0 | File does not exist. Supabase middleware helper exists but nothing calls it. Auth session refresh will not work without this. |
| **Component library** | P0 | Zero components in `src/components/`. |
| **Auth pages** | P1 | No login, callback, or signup pages. |
| **Form handling** | P1 | No form infrastructure (React Hook Form not installed). |
| **Error boundaries** | P1 | No `error.tsx` files anywhere. |
| **Loading states** | P1 | No `loading.tsx` files anywhere. |
| **Participant router** | P2 | tRPC API has no participant CRUD router (template.byId fetches them, but no add/remove). |
| **Share link router** | P2 | DB schema has `shared_links` table but no tRPC router for it. |

### Dependency Gaps

These packages need to be added to `apps/web/package.json`:

```
# Required for forms
react-hook-form @hookform/resolvers

# Required for shadcn/ui (will be auto-installed by CLI)
class-variance-authority clsx tailwind-merge
lucide-react @radix-ui/react-* (per component)

# Required for number formatting
# (none - Intl.NumberFormat covers KRW formatting)
```

---

## 2. shadcn/ui Setup Strategy

### Decision: Install shadcn/ui directly in `apps/web/`

We are NOT creating a `packages/ui` shared package. The ARCHITECTURE.md explicitly states this is intentionally excluded because web (`div`) and mobile (`View`) components are fundamentally different. shadcn components live in `apps/web/src/components/ui/`.

### Installation Commands

```bash
# Step 1: Initialize shadcn in the web app
cd apps/web
pnpm dlx shadcn@latest init

# When prompted:
# - Style: new-york
# - Base color: neutral (we already have custom oklch tokens)
# - CSS variables: yes
# - CSS file: src/app/styles.css
# - Tailwind config: (leave blank - Tailwind v4)
# - Components alias: ~/components
# - Utils alias: ~/lib/utils
# - React Server Components: yes
# - Icon library: lucide
```

### components.json Configuration

This file will be auto-generated at `apps/web/components.json`. Verify it matches:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/styles.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "~/components",
    "utils": "~/lib/utils",
    "ui": "~/components/ui",
    "hooks": "~/hooks",
    "lib": "~/lib"
  }
}
```

**Key point**: `tailwind.config` is empty string because Tailwind v4 is CSS-first. Our theme is already in `tooling/tailwind/theme.css` with all the oklch variables shadcn expects (`--primary`, `--secondary`, etc.). This is already imported via `@import "@naran/tailwind-config/theme"` in `styles.css`. No extra config needed.

### Tailwind v4 Compatibility Notes

- Our `styles.css` already has the correct v4 structure: `@import "tailwindcss"`, `@import "tw-animate-css"`, `@custom-variant dark`.
- The `theme.css` already uses `@theme inline` with all shadcn color tokens in oklch format.
- The `tw-animate-css` package is already installed (replaces the old `tailwindcss-animate` plugin from v3).
- **No tailwind.config.js needed**. Everything is CSS-based.

### Component Installation Commands

Install in batches by feature area. Run all from `apps/web/`:

```bash
# Batch 1: Foundation (install first)
pnpm dlx shadcn@latest add button card input label separator skeleton badge

# Batch 2: Overlays & Navigation
pnpm dlx shadcn@latest add dialog sheet dropdown-menu popover tabs

# Batch 3: Forms
pnpm dlx shadcn@latest add select checkbox toggle toggle-group

# Batch 4: Feedback
pnpm dlx shadcn@latest add sonner alert alert-dialog tooltip

# Batch 5: Data Display
pnpm dlx shadcn@latest add avatar scroll-area collapsible

# Batch 6: Advanced (as needed)
pnpm dlx shadcn@latest add command drawer
```

**Complete component list for CalPayment**:

| Component | Used For |
|-----------|----------|
| `Button` | All CTAs, submit, cancel, share |
| `Card` | Template cards, payment cards, settlement summary |
| `Input` | Template name, participant name, payment amount |
| `Label` | Form labels |
| `Dialog` | Create template, add payment, confirm delete |
| `Sheet` | Mobile navigation, payment detail on mobile |
| `Tabs` | Template detail sections (payments / settlement) |
| `Badge` | Participant count, tag colors, payment status |
| `Separator` | Section dividers |
| `Skeleton` | Loading states for all data-dependent UI |
| `Avatar` | Participant display (initials + tag color) |
| `DropdownMenu` | Template actions (edit, delete, share) |
| `Select` | Payer selection, participant selection |
| `Checkbox` | Multi-select participants in payment form |
| `Popover` | Color picker for participant tags |
| `Sonner` | Toast notifications (save success, copy link, errors) |
| `AlertDialog` | Destructive confirmations (delete template/payment) |
| `Tooltip` | Icon button labels |
| `ScrollArea` | Long participant/payment lists |
| `Collapsible` | Settlement detail per person |
| `Drawer` | Mobile-only bottom sheet for add payment |
| `Toggle` / `ToggleGroup` | Participant selection in payment form |
| `Command` | Quick search templates (future) |

---

## 3. App Router File Structure

### Complete Directory Layout

```
apps/web/src/
├── app/
│   ├── (landing)/
│   │   ├── layout.tsx              # Minimal layout (no app chrome)
│   │   └── page.tsx                # Landing page - hero, CTA
│   │
│   ├── (app)/
│   │   ├── layout.tsx              # App shell: header, mobile nav
│   │   ├── dashboard/
│   │   │   ├── page.tsx            # Template list
│   │   │   ├── loading.tsx         # Skeleton grid
│   │   │   └── error.tsx           # Error boundary
│   │   ├── template/
│   │   │   ├── new/
│   │   │   │   └── page.tsx        # Create template form
│   │   │   └── [id]/
│   │   │       ├── page.tsx        # Template detail (tabs)
│   │   │       ├── loading.tsx     # Skeleton detail
│   │   │       └── error.tsx       # Error boundary
│   │   └── settings/
│   │       └── page.tsx            # User settings
│   │
│   ├── (auth)/
│   │   ├── layout.tsx              # Centered auth layout
│   │   ├── login/
│   │   │   └── page.tsx            # Login form (Kakao, Google)
│   │   └── callback/
│   │       └── route.ts            # Supabase auth callback handler
│   │
│   ├── share/
│   │   └── [token]/
│   │       ├── page.tsx            # Public settlement view
│   │       ├── loading.tsx
│   │       └── error.tsx
│   │
│   ├── api/
│   │   └── trpc/
│   │       └── [trpc]/
│   │           └── route.ts        # Existing tRPC handler
│   │
│   ├── layout.tsx                  # Root layout (existing)
│   ├── page.tsx                    # Root → redirect logic
│   ├── styles.css                  # Existing global styles
│   ├── not-found.tsx               # Custom 404
│   └── error.tsx                   # Global error boundary
│
├── components/
│   ├── ui/                         # shadcn components (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── app-header.tsx          # CC - Header with user menu
│   │   ├── mobile-nav.tsx          # CC - Bottom tab nav (mobile)
│   │   └── page-header.tsx         # SC - Page title + breadcrumb
│   │
│   ├── template/
│   │   ├── template-list.tsx       # CC - Grid of template cards
│   │   ├── template-card.tsx       # CC - Single template card
│   │   ├── create-template-dialog.tsx  # CC - Create form in dialog
│   │   └── template-actions.tsx    # CC - Dropdown (edit/delete/share)
│   │
│   ├── participant/
│   │   ├── participant-list.tsx    # CC - List with add/remove
│   │   ├── participant-avatar.tsx  # SC - Avatar with initials + color
│   │   ├── add-participant-form.tsx # CC - Name + color input
│   │   └── participant-selector.tsx # CC - Toggle group for payment form
│   │
│   ├── payment/
│   │   ├── payment-list.tsx        # CC - Payment cards list
│   │   ├── payment-card.tsx        # CC - Single payment display
│   │   ├── add-payment-form.tsx    # CC - Full payment form
│   │   └── amount-input.tsx        # CC - KRW formatted number input
│   │
│   ├── settlement/
│   │   ├── settlement-summary.tsx  # CC - Total + per-person overview
│   │   ├── settlement-detail.tsx   # CC - Collapsible per-person detail
│   │   ├── send-list-item.tsx      # SC - "A → B: 10,000원" row
│   │   └── share-result-button.tsx # CC - Generate & copy share link
│   │
│   └── common/
│       ├── empty-state.tsx         # SC - Empty state illustration + CTA
│       ├── amount-display.tsx      # SC - Formatted KRW amount
│       ├── confirm-dialog.tsx      # CC - Reusable AlertDialog wrapper
│       └── error-fallback.tsx      # CC - Error boundary fallback UI
│
├── hooks/
│   ├── use-template.ts             # tRPC query wrapper for template.byId
│   ├── use-templates.ts            # tRPC query wrapper for template.list
│   ├── use-settlement.ts           # tRPC query wrapper for settlement.calculate
│   └── use-media-query.ts          # Responsive breakpoint detection
│
├── lib/
│   ├── utils.ts                    # cn() helper (shadcn generates this)
│   ├── format.ts                   # KRW formatting, date formatting
│   ├── constants.ts                # Tag colors, app config
│   └── supabase/                   # Existing Supabase clients
│       ├── server.ts
│       ├── client.ts
│       └── middleware.ts
│
├── trpc/                           # Existing tRPC setup
│   ├── server.tsx
│   ├── react.tsx
│   └── query-client.ts
│
└── env.ts                          # Existing env validation
```

### Route Specifications

#### Root Page (`/`)
- **Type**: Server Component
- **Data fetching**: Check Supabase auth state server-side
- **Behavior**: If authenticated, `redirect("/dashboard")`. If not, render `(landing)/page.tsx` via route group.
- **Loading**: None needed (redirect is instant)

#### Landing Page (`(landing)/page.tsx`)
- **Type**: Server Component
- **Data fetching**: None
- **Key content**: Hero section, value props, CTA buttons (login / try demo)
- **Loading**: None (static content)
- **Error**: None (no data dependencies)

#### Dashboard (`(app)/dashboard/page.tsx`)
- **Type**: Server Component (prefetch) + Client Component children
- **Data fetching**: `prefetch(trpc.template.list.queryOptions())` in SC, consumed via `useTRPC().template.list.useSuspenseQuery()` in CC
- **Key props**: None (user context from auth)
- **Loading**: `loading.tsx` renders a grid of `Skeleton` cards (3x2 grid)
- **Error**: `error.tsx` shows retry button + generic error message

#### Create Template (`(app)/template/new/page.tsx`)
- **Type**: Client Component
- **Data fetching**: `template.create` mutation on submit
- **Key content**: Simple form: template name input + submit
- **Loading**: Button loading state only
- **Error**: Form-level error display via Zod validation
- **On success**: `router.push(\`/template/\${newId}\`)`

#### Template Detail (`(app)/template/[id]/page.tsx`)
- **Type**: Server Component (prefetch) + Client Component children
- **Data fetching**: `prefetch(trpc.template.byId.queryOptions({ id: params.id }))` in SC
- **Params**: `{ id: string }` (UUID)
- **Loading**: `loading.tsx` renders skeleton tabs + skeleton lists
- **Error**: `error.tsx` handles template not found (404-like) + generic errors
- **Key structure**: Tabbed view with "Participants + Payments" and "Settlement"

#### Login (`(auth)/login/page.tsx`)
- **Type**: Client Component
- **Data fetching**: Supabase Auth `signInWithOAuth` (Kakao, Google)
- **Loading**: Button loading state during OAuth redirect
- **Error**: Toast for auth failures

#### Auth Callback (`(auth)/callback/route.ts`)
- **Type**: Route Handler (not a page)
- **Behavior**: Exchange code for session, redirect to `/dashboard`

#### Share View (`share/[token]/page.tsx`)
- **Type**: Server Component
- **Data fetching**: Server-side fetch of template by share token (new tRPC route needed)
- **Params**: `{ token: string }`
- **Loading**: Full page skeleton
- **Error**: "Link expired or invalid" with CTA to create own
- **Key note**: Read-only view, no auth required. This is a public route.

#### Settings (`(app)/settings/page.tsx`)
- **Type**: Client Component
- **Data fetching**: Supabase auth user info
- **Key content**: Display name, logout button, theme toggle (future)
- **Loading**: Skeleton for user info
- **Error**: Generic

---

## 4. Component Architecture

### Dashboard Page Component Tree

```
DashboardPage (SC)
│  └─ prefetch: trpc.template.list
│
├── PageHeader (SC)
│   ├── h1: "내 모임"
│   └── CreateTemplateDialog (CC)
│       ├── Button (trigger)
│       ├── Dialog
│       │   ├── Input (template name)
│       │   └── Button (submit) → template.create mutation
│       └── Sonner (success toast)
│
└── HydrateClient
    └── TemplateList (CC) — useSuspenseQuery
        ├── [map] TemplateCard (CC)
        │   ├── Card
        │   │   ├── CardHeader
        │   │   │   ├── template.name
        │   │   │   └── TemplateActions (CC)
        │   │   │       └── DropdownMenu
        │   │   │           ├── "Edit name"
        │   │   │           ├── "Share" → copy link
        │   │   │           └── "Delete" → ConfirmDialog
        │   │   └── CardContent
        │   │       ├── Badge: "{n}명 참가"
        │   │       ├── Badge: "{n}건 결제"
        │   │       └── AmountDisplay: total amount
        │   └── Link → /template/[id]
        │
        └── EmptyState (when list.length === 0)
            ├── illustration
            └── "첫 모임을 만들어보세요" + CTA
```

### Template Detail Page Component Tree

```
TemplateDetailPage (SC)
│  └─ prefetch: trpc.template.byId({ id })
│
└── HydrateClient
    └── TemplateDetailContent (CC) — useSuspenseQuery
        │
        ├── PageHeader (SC)
        │   ├── h1: template.name
        │   ├── TemplateActions
        │   └── ShareResultButton
        │
        └── Tabs
            ├── TabsTrigger: "참가자 & 결제"
            ├── TabsTrigger: "정산 결과"
            │
            ├── TabsContent: "참가자 & 결제"
            │   ├── Section: Participants
            │   │   ├── ParticipantList (CC)
            │   │   │   ├── [map] ParticipantAvatar
            │   │   │   │   ├── Avatar (initials + tagColor bg)
            │   │   │   │   ├── name
            │   │   │   │   └── X button (remove)
            │   │   │   └── AddParticipantForm (CC)
            │   │   │       ├── Input (name)
            │   │   │       ├── Popover → color picker
            │   │   │       └── Button (add)
            │   │   │
            │   │   └── Separator
            │   │
            │   └── Section: Payments
            │       ├── PaymentList (CC)
            │       │   ├── [map] PaymentCard (CC)
            │       │   │   ├── Card
            │       │   │   │   ├── title + AmountDisplay
            │       │   │   │   ├── "결제: {payerName}"
            │       │   │   │   ├── [map] Badge: participant names
            │       │   │   │   └── Button: delete
            │       │   │   └── Collapsible detail (optional)
            │       │   └── EmptyState
            │       │
            │       └── AddPaymentButton (CC)
            │           └── Dialog (desktop) / Drawer (mobile)
            │               └── AddPaymentForm (CC)
            │                   ├── Input: title
            │                   ├── AmountInput: amount (KRW formatted)
            │                   ├── Select: payer
            │                   ├── ParticipantSelector (CC)
            │                   │   └── ToggleGroup: multi-select participants
            │                   └── Button: submit
            │
            └── TabsContent: "정산 결과"
                └── SettlementView (CC)
                    │  └─ useQuery: trpc.settlement.calculate
                    │
                    ├── SettlementSummary (CC)
                    │   ├── Card: "총 결제 금액" + AmountDisplay
                    │   └── Card: "참가자 {n}명"
                    │
                    └── [map] SettlementDetail (CC)
                        └── Collapsible
                            ├── trigger: "{name} → 보내야 할 금액: {tossTotal}"
                            └── content: [map] SendListItem
                                └── "{name}에게 → {amount}원"
```

### Share View Page Component Tree

```
SharePage (SC)
│  └─ server-side fetch: template by token
│
├── PageHeader (SC)
│   ├── CalPayment logo
│   └── h1: "{template.name} 정산 결과"
│
├── SettlementSummary (reused)
│   └── Read-only totals
│
├── [map] SettlementDetail (reused)
│   └── Read-only send lists
│
└── CTASection (SC)
    ├── "나도 정산해보기" → Link to landing/login
    └── App store links (future)
```

### Login Page Component Tree

```
LoginPage (CC)
│
├── Card
│   ├── CardHeader
│   │   ├── Logo
│   │   └── h1: "로그인"
│   │
│   └── CardContent
│       ├── Button: "카카오로 시작하기" (yellow, Kakao icon)
│       │   └── onClick: supabase.auth.signInWithOAuth({ provider: 'kakao' })
│       │
│       ├── Separator: "또는"
│       │
│       └── Button: "Google로 시작하기" (outline, Google icon)
│           └── onClick: supabase.auth.signInWithOAuth({ provider: 'google' })
│
└── footer: "계속하면 이용약관에 동의하는 것으로 간주합니다"
```

---

## 5. Data Flow Architecture

### Pattern 1: Server-Side Prefetch (Read Operations)

Used for: Dashboard template list, template detail, share view.

```tsx
// page.tsx (Server Component)
import { HydrateClient, prefetch, trpc } from "~/trpc/server";

export default async function DashboardPage() {
  prefetch(trpc.template.list.queryOptions());

  return (
    <HydrateClient>
      <TemplateList />
    </HydrateClient>
  );
}

// template-list.tsx (Client Component)
"use client";
import { useTRPC } from "~/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";

export function TemplateList() {
  const trpc = useTRPC();
  const [templates] = useSuspenseQuery(trpc.template.list.queryOptions());
  // render...
}
```

**Why this pattern**: Data is fetched on the server during SSR, serialized into the HTML via `HydrateClient`, and the client picks it up without an extra network request. The `useSuspenseQuery` integrates with the `loading.tsx` Suspense boundary automatically.

### Pattern 2: Client-Side Mutations

Used for: Create template, add payment, add participant, delete operations.

```tsx
"use client";
import { useTRPC } from "~/trpc/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function CreateTemplateDialog() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createMutation = useMutation(
    trpc.template.create.mutationOptions({
      onSuccess: () => {
        // Invalidate the template list to refetch
        queryClient.invalidateQueries({ queryKey: trpc.template.list.queryKey() });
      },
    })
  );

  const onSubmit = (data: { name: string }) => {
    createMutation.mutate(data);
  };
}
```

### Pattern 3: Optimistic Updates

Used for: Delete template, delete payment (where instant UI feedback matters).

```tsx
const deleteMutation = useMutation(
  trpc.template.delete.mutationOptions({
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: trpc.template.list.queryKey() });
      const previous = queryClient.getQueryData(trpc.template.list.queryKey());

      queryClient.setQueryData(trpc.template.list.queryKey(), (old) =>
        old?.filter((t) => t.id !== deletedId)
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(trpc.template.list.queryKey(), context?.previous);
      toast.error("삭제에 실패했습니다");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: trpc.template.list.queryKey() });
    },
  })
);
```

**Decision: Use optimistic updates ONLY for deletes.** Creates and edits should show loading states instead. Optimistic creates are fragile (you don't have the server-generated UUID yet), and the UX gain is marginal. Deletes, on the other hand, feel sluggish without optimistic removal.

### Form State Management

**Decision: React Hook Form + Zod resolvers.**

Justification:
- We already have Zod schemas in `@naran/core/validators` for all entities.
- React Hook Form is the standard choice with shadcn/ui (their docs use it in all form examples).
- It avoids unnecessary re-renders compared to controlled `useState` forms.
- `@hookform/resolvers/zod` connects our existing schemas directly.

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, type PaymentInput } from "@naran/core";

const form = useForm<PaymentInput>({
  resolver: zodResolver(paymentSchema),
  defaultValues: {
    title: "",
    amount: 0,
    payerName: "",
    participantNames: [],
  },
});
```

### URL-Based State

Use `searchParams` for state that should be shareable/bookmarkable:

| State | URL Param | Example |
|-------|-----------|---------|
| Active tab in template detail | `?tab=settlement` | `/template/abc?tab=settlement` |
| Dashboard sort order | `?sort=newest` | `/dashboard?sort=newest` |
| Search query (future) | `?q=춘천여행` | `/dashboard?q=춘천여행` |

Implementation: Use `useSearchParams()` from `next/navigation` in Client Components. Avoid `useState` for tab state since it breaks back button behavior.

---

## 6. MVP Data Strategy (No Supabase Yet)

### Decision: Option C - In-Memory Store with Same tRPC API Shape

**Reject Option A (localStorage + React state)**: This bypasses our entire tRPC layer. We'd build UI that talks to localStorage, then rewrite it all when Supabase is ready. Double work.

**Reject Option B (Mock tRPC responses)**: Static mocks don't support mutations. We need add/delete to work.

**Choose Option C**: Replace the Drizzle DB calls with an in-memory store that implements the same interface. The tRPC routers, React Query cache, and all UI code remain identical. When Supabase is ready, we swap the store implementation and change zero frontend code.

### Implementation

Create a `packages/db/src/mock-client.ts` that implements the same query interface as the Drizzle client:

```ts
// packages/db/src/mock-store.ts
import { v4 as uuid } from "uuid";

// In-memory state
let templates: Template[] = [];
let participants: Participant[] = [];
let payments: Payment[] = [];
let paymentParticipants: PaymentParticipant[] = [];

// Seed with sample data
function seed() {
  const templateId = uuid();
  templates.push({
    id: templateId,
    userId: "mock-user-id",
    name: "춘천 여행",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const p1Id = uuid(), p2Id = uuid(), p3Id = uuid();
  participants.push(
    { id: p1Id, templateId, name: "철수", tagColor: "#FF6B6B", createdAt: new Date() },
    { id: p2Id, templateId, name: "영희", tagColor: "#4ECDC4", createdAt: new Date() },
    { id: p3Id, templateId, name: "민수", tagColor: "#45B7D1", createdAt: new Date() },
  );
  // ... payments, etc.
}
```

Then create a mock DB client that matches Drizzle's query API:

```ts
// packages/db/src/mock-client.ts
export const db = {
  query: {
    templates: {
      findMany: async ({ where, orderBy }) => { /* filter in-memory */ },
      findFirst: async ({ where, with: relations }) => { /* join in-memory */ },
    },
    payments: {
      findMany: async ({ where, with: relations }) => { /* filter in-memory */ },
    },
  },
  insert: (table) => ({
    values: (data) => ({
      returning: async () => { /* push to array, return */ },
    }),
  }),
  delete: (table) => ({
    where: (condition) => async () => { /* splice from array */ },
  }),
};
```

**Toggle between mock and real**:

```ts
// packages/db/src/client.ts
const USE_MOCK = !process.env.POSTGRES_URL || process.env.POSTGRES_URL === "mock";

export const db = USE_MOCK
  ? (await import("./mock-client")).db
  : createRealDrizzleClient();
```

**Also mock the auth user** in the tRPC context by setting `user` to a fake `User` object when `SUPABASE_SERVICE_ROLE_KEY` is not set. This way `protectedProcedure` works without Supabase.

**Benefit**: Every team member can `pnpm dev:web` without any `.env` file and get a working app with sample data. Zero external dependencies for frontend development.

---

## 7. Performance Strategy

### Next.js Image Optimization

- Use `next/image` for all user-facing images (landing page illustrations, icons if raster).
- For icons, use Lucide React (tree-shakeable SVGs, no image optimization needed).
- Set `images.remotePatterns` in `next.config.js` if we add user avatars from Kakao/Google OAuth.
- The landing page hero image should use `priority` prop for LCP optimization.

### Route Prefetching

- Next.js App Router prefetches `<Link>` components by default on viewport intersection. Keep this default.
- For the dashboard, each `TemplateCard` wraps a `<Link href={/template/${id}}>`. Next.js will prefetch the JS bundle automatically.
- **Do NOT prefetch tRPC data on hover.** The template detail page already SSR-prefetches on navigation. Hovering would waste bandwidth.

### Bundle Splitting

- shadcn/ui components are copy-pasted source, not a library bundle. Tree-shaking is automatic.
- Heavy components (`Command`, `Drawer`) are only imported in routes that use them. Next.js App Router code-splits per route automatically.
- The `@naran/core` settlement calculation is ~2KB. No splitting needed.
- `superjson` (used by tRPC) is ~4KB. Acceptable.
- `react-hook-form` is ~9KB gzipped. Loaded only on pages with forms.
- **Do NOT use `next/dynamic` lazily unless a component is >50KB.** The overhead of Suspense boundaries + loading states is not worth it for small components.

### Critical CSS

- Tailwind v4 with Next.js handles CSS extraction automatically. No manual critical CSS needed.
- The `@import` chain (`tailwindcss` -> `tw-animate-css` -> `@naran/tailwind-config/theme`) is resolved at build time.
- Unused CSS is purged by Tailwind's content detection.

### Additional Performance Measures

- **React Query staleTime**: Already set to 30 seconds. This prevents refetching on back navigation.
- **Dehydration**: The `HydrateClient` pattern means zero loading spinners on initial page load for SSR-prefetched data.
- **Font optimization**: Already using `next/font/google` with Geist. Font files are self-hosted, no external request.

---

## 8. Mobile-First Responsive Plan

### Breakpoints

Use Tailwind's default breakpoints. Three tiers are enough:

| Tier | Breakpoint | Target |
|------|-----------|--------|
| Mobile (default) | `< 640px` | Phone portrait |
| Tablet | `sm` (640px+) | Phone landscape, small tablet |
| Desktop | `lg` (1024px+) | Laptop, desktop |

We do NOT need `md` (768px) or `xl` (1280px) breakpoints for this app. Two breakpoints keep the CSS simple and the design consistent.

### Navigation Per Breakpoint

| Element | Mobile | Tablet (sm+) | Desktop (lg+) |
|---------|--------|---------------|----------------|
| Header | Logo only, hamburger menu | Logo + nav links | Logo + nav links + user menu |
| Primary nav | Bottom tab bar (fixed) | Bottom tab bar | Top header integrated |
| Page padding | `px-4` | `px-6` | `px-8`, max-width container |

**Decision: Bottom tab bar for mobile/tablet, top nav for desktop.**

The bottom tab bar has three items:
1. Dashboard (home icon)
2. Create (+ icon, accent color)
3. Settings (gear icon)

On desktop (`lg+`), these become top nav links and the bottom bar disappears.

```tsx
// mobile-nav.tsx
"use client";
export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background lg:hidden">
      <div className="flex h-14 items-center justify-around">
        {/* NavItems */}
      </div>
    </nav>
  );
}
```

### Touch Target Sizes

All interactive elements must meet 44x44px minimum:

```tsx
// All buttons: min-h-11 (44px) by default via shadcn Button size="default"
// Icon buttons: explicitly size-11
// List items: min-h-12 with py-3
// Tab triggers: min-h-11
// Checkbox/Toggle: size-6 with padding to reach 44px touch area
```

Custom utility if needed:
```css
@utility touch-target {
  min-width: 44px;
  min-height: 44px;
}
```

### Bottom Sheet vs Modal

| Action | Mobile (< 640px) | Desktop (lg+) |
|--------|-------------------|----------------|
| Add payment | `Drawer` (bottom sheet) | `Dialog` (centered modal) |
| Template actions | `Sheet` (bottom) | `DropdownMenu` |
| Delete confirm | `AlertDialog` (both) | `AlertDialog` (both) |
| Create template | `Drawer` (bottom sheet) | `Dialog` (centered modal) |

Implementation pattern using the `useMediaQuery` hook:

```tsx
"use client";
import { useMediaQuery } from "~/hooks/use-media-query";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Drawer, DrawerContent } from "~/components/ui/drawer";

export function AddPaymentContainer({ children, open, onOpenChange }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">{children}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
```

### Layout Grids

| Page | Mobile | sm+ | lg+ |
|------|--------|-----|-----|
| Dashboard (template cards) | 1 column | 2 columns | 3 columns |
| Template detail (tabs content) | Full width | Full width | 2-column: participants (left) + payments (right) |
| Settlement results | Stack | Stack | 2-column grid |

```tsx
// Dashboard grid
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {templates.map(t => <TemplateCard key={t.id} template={t} />)}
</div>
```

### Body Padding for Mobile Nav

Account for the fixed bottom nav on mobile:

```tsx
// (app)/layout.tsx
export default function AppLayout({ children }) {
  return (
    <>
      <AppHeader />
      <main className="pb-16 lg:pb-0">{children}</main>
      <MobileNav />
    </>
  );
}
```

---

## Appendix A: Missing tRPC Routers to Add

Before building the frontend, these API gaps must be filled:

### Participant Router (`packages/api/src/router/participant.ts`)

```ts
export const participantRouter = {
  /** Add participant to template */
  create: publicProcedure
    .input(z.object({
      templateId: z.string().uuid(),
      name: z.string().min(1).max(20),
      tagColor: z.string(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(participants).values(input).returning();
    }),

  /** Remove participant */
  delete: publicProcedure
    .input(z.string().uuid())
    .mutation(({ ctx, input }) => {
      return ctx.db.delete(participants).where(eq(participants.id, input));
    }),
};
```

### Share Link Router (`packages/api/src/router/share.ts`)

```ts
export const shareRouter = {
  /** Create share link for template */
  create: protectedProcedure
    .input(z.object({ templateId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const token = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
      return ctx.db.insert(sharedLinks).values({
        templateId: input.templateId,
        token,
      }).returning();
    }),

  /** Get template by share token (public) */
  byToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.sharedLinks.findFirst({
        where: eq(sharedLinks.token, input.token),
        with: {
          template: {
            with: {
              participants: true,
              payments: { with: { payer: true, participants: { with: { participant: true } } } },
            },
          },
        },
      });
    }),
};
```

Register both in `packages/api/src/root.ts`:

```ts
export const appRouter = createTRPCRouter({
  template: templateRouter,
  payment: paymentRouter,
  settlement: settlementRouter,
  participant: participantRouter, // NEW
  share: shareRouter,             // NEW
});
```

---

## Appendix B: middleware.ts (Must Create)

Create `apps/web/src/middleware.ts`:

```ts
import type { NextRequest } from "next/server";
import { updateSession } from "~/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Match all routes except static files and API
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

This is critical. Without it, Supabase auth cookies are never refreshed, and users will get silently logged out.

---

## Appendix C: Key Utility Functions

### `lib/format.ts`

```ts
/** Format number as Korean Won */
export function formatKRW(amount: number): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}

/** Format number with comma separators (no currency symbol) */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("ko-KR").format(amount);
}

/** Format relative date in Korean */
export function formatRelativeDate(date: Date): string {
  const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });
  const diff = date.getTime() - Date.now();
  const days = Math.round(diff / (1000 * 60 * 60 * 24));

  if (Math.abs(days) < 1) return "오늘";
  if (Math.abs(days) < 7) return rtf.format(days, "day");
  if (Math.abs(days) < 30) return rtf.format(Math.round(days / 7), "week");
  return rtf.format(Math.round(days / 30), "month");
}
```

### `lib/constants.ts`

```ts
/** Predefined tag colors for participants */
export const TAG_COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
  "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F",
  "#BB8FCE", "#85C1E9", "#F0B27A", "#AED6F1",
] as const;

/** App config */
export const APP_CONFIG = {
  maxParticipants: 20,
  maxPayments: 50,
  maxTemplateNameLength: 50,
  maxPaymentTitleLength: 100,
} as const;
```

---

## Appendix D: Implementation Order

This is the order the team should build in:

| Phase | Tasks | Owner |
|-------|-------|-------|
| **Phase 0** | shadcn/ui init + components install, middleware.ts, mock data store, `lib/utils.ts` + `lib/format.ts` | FE1 (Tech Lead) |
| **Phase 1** | Root layout update, `(app)/layout.tsx` with AppHeader + MobileNav, landing page | FE2 |
| **Phase 2** | Dashboard page + TemplateList + TemplateCard + CreateTemplateDialog | FE3 |
| **Phase 3** | Template detail page: participant section (list, add, remove) | FE4 |
| **Phase 4** | Template detail page: payment section (list, add, delete) | FE3 |
| **Phase 5** | Template detail page: settlement tab (summary, detail, collapsible) | FE4 |
| **Phase 6** | Auth pages (login, callback) + middleware protection | FE2 |
| **Phase 7** | Share flow (create link, public view page) | FE5 |
| **Phase 8** | Polish: loading skeletons, error boundaries, empty states, responsive QA | All |

---

## Sources

- [Next.js Installation - shadcn/ui](https://ui.shadcn.com/docs/installation/next)
- [Tailwind v4 - shadcn/ui](https://ui.shadcn.com/docs/tailwind-v4)
- [Monorepo - shadcn/ui](https://ui.shadcn.com/docs/monorepo)
- [components.json - shadcn/ui](https://ui.shadcn.com/docs/components-json)
- [shadcn/ui - Turborepo Guide](https://turborepo.dev/docs/guides/tools/shadcn-ui)
- [Manual Installation - shadcn/ui](https://ui.shadcn.com/docs/installation/manual)
