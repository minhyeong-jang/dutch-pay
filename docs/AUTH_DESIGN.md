# CalPayment Backend Auth & Architecture Design

> Backend Developer Deliverable - Supabase Auth Flow Design + Frontend Architecture Advice

---

## Deliverable 1: Supabase Auth Design Document

---

### 1. Auth Flow Architecture

#### 1.1 Social Login Providers

CalPayment supports three OAuth providers, prioritized for the Korean market.

##### (A) Kakao (Primary)

**Kakao Developer Portal Setup:**

1. https://developers.kakao.com 에서 로그인 후 "애플리케이션 추가하기" 클릭
2. 앱 이름: "CalPayment" / 사업자명 입력
3. **앱 키 확인**: 앱 설정 > 앱 키 > **REST API 키** (= Supabase의 `client_id`)
4. **Client Secret 발급**: 제품 설정 > 카카오 로그인 > 보안 > Client Secret 코드 생성 및 "사용" 으로 변경
5. **카카오 로그인 활성화**: 제품 설정 > 카카오 로그인 > 활성화 설정 ON
6. **Redirect URI 등록**: 제품 설정 > 카카오 로그인 > Redirect URI에 아래 URL 추가:
   ```
   https://<PROJECT_REF>.supabase.co/auth/v1/callback
   ```
7. **동의항목 설정**: 제품 설정 > 카카오 로그인 > 동의항목 > 닉네임, 프로필 사진, 이메일 (선택 동의)
8. **OpenID Connect 활성화** (권장): 제품 설정 > 카카오 로그인 > OpenID Connect > 활성화

**Supabase Dashboard Setup:**
1. Authentication > Providers > Kakao 활성화
2. Client ID = REST API 키
3. Client Secret = 카카오 로그인 보안의 Client Secret 코드

**Token Flow:**
```
User clicks "카카오 로그인"
  -> signInWithOAuth({ provider: 'kakao' })
  -> Redirect to https://kauth.kakao.com/oauth/authorize
  -> User authorizes on Kakao
  -> Kakao redirects to https://<PROJECT_REF>.supabase.co/auth/v1/callback?code=AUTH_CODE
  -> Supabase exchanges AUTH_CODE for Kakao access_token
  -> Supabase creates/updates user in auth.users
  -> Supabase issues its own JWT + refresh_token
  -> Redirect to our app /auth/callback?code=PKCE_CODE
  -> Our app calls exchangeCodeForSession(PKCE_CODE)
  -> Session cookies set, user authenticated
```

##### (B) Google (Secondary)

**Google Cloud Console Setup:**

1. https://console.cloud.google.com > APIs & Services > Credentials
2. "Create Credentials" > OAuth Client ID > Application Type: "Web application"
3. **Authorized redirect URIs** 추가:
   ```
   https://<PROJECT_REF>.supabase.co/auth/v1/callback
   ```
4. Client ID와 Client Secret 복사

**Supabase Dashboard Setup:**
1. Authentication > Providers > Google 활성화
2. Client ID와 Client Secret 입력
3. (선택) "Skip nonce checks" - Google One Tap 사용 시 활성화

**Token Flow:**
```
signInWithOAuth({ provider: 'google' })
  -> Redirect to accounts.google.com/o/oauth2/v2/auth
  -> User selects Google account
  -> Google redirects to Supabase callback with auth code
  -> Supabase exchanges for Google tokens
  -> Creates/updates auth.users entry
  -> PKCE flow back to our /auth/callback
  -> exchangeCodeForSession() -> session established
```

##### (C) Apple (Required for iOS App Store)

**Apple Developer Setup:**

1. https://developer.apple.com > Certificates, Identifiers & Profiles
2. **App ID 생성**: Identifiers > App IDs > "Sign in with Apple" 체크
3. **Service ID 생성** (웹용): Identifiers > Services IDs
   - Identifier: `com.calpayment.web`
   - "Sign in with Apple" 활성화 > Configure:
     - Domains: `<PROJECT_REF>.supabase.co`
     - Return URLs: `https://<PROJECT_REF>.supabase.co/auth/v1/callback`
4. **Key 생성** (Secret 키): Keys > Create a key > "Sign in with Apple" 체크
   - `.p8` 파일 다운로드 (한 번만 가능, 안전하게 보관)
   - Key ID 기록
5. **Secret 생성**: Apple의 `.p8` 키를 사용하여 JWT client_secret 생성 (6개월마다 갱신 필요)

**Supabase Dashboard Setup:**
1. Authentication > Providers > Apple 활성화
2. Service ID (= Client ID): `com.calpayment.web`
3. Secret Key: `.p8` 파일 내용으로 생성한 JWT

**중요 유지보수 사항:**
- Apple OAuth secret key는 **6개월마다 갱신** 필수
- 갱신 안 하면 Apple 로그인 전체 장애 발생
- 캘린더 알림 설정 권장
- Apple은 사용자 이름을 identity token에 포함하지 않으므로, 최초 로그인 시 프론트에서 이름을 받아 user_metadata로 저장해야 함

**Token Flow:**
```
signInWithOAuth({ provider: 'apple' })
  -> Redirect to appleid.apple.com/auth/authorize
  -> User authenticates with Face ID / password
  -> Apple redirects to Supabase callback (POST, not GET)
  -> Supabase validates identity_token
  -> Creates/updates auth.users
  -> PKCE flow back to /auth/callback
  -> Session established
```

#### 1.2 Client-Side Login Implementation

```typescript
// apps/web/src/lib/auth.ts

import { createClient } from '~/lib/supabase/client';

type OAuthProvider = 'kakao' | 'google' | 'apple';

export async function signInWithProvider(provider: OAuthProvider) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      // Kakao: request additional scopes
      ...(provider === 'kakao' && {
        scopes: 'profile_nickname profile_image account_email',
      }),
    },
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
```

#### 1.3 Auth Callback Route Handler

This route is critical -- it completes the PKCE flow by exchanging the auth code for a session.

```typescript
// apps/web/src/app/auth/callback/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '~/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // "next" param allows provider-specific post-login redirect
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if user has localStorage data to migrate
      // (handled client-side after redirect)
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth error - redirect to error page
  return NextResponse.redirect(`${origin}/auth/error`);
}
```

---

### 2. Session Management

#### 2.1 How Supabase Handles Sessions

Supabase Auth uses a **JWT access token + refresh token** pair:

| Token | Lifetime | Storage | Purpose |
|-------|----------|---------|---------|
| Access Token (JWT) | 1 hour (default, configurable) | Cookie (via `@supabase/ssr`) | Authenticates API requests, contains user claims |
| Refresh Token | Never expires (one-time use) | Cookie (via `@supabase/ssr`) | Exchanges for new access + refresh token pair |

**JWT Claims include:**
- `sub`: user UUID (= `auth.uid()`)
- `email`: user email
- `role`: `authenticated` or `anon`
- `session_id`: UUID linking to `auth.sessions` table
- `app_metadata`: provider info, roles
- `user_metadata`: name, avatar from OAuth

#### 2.2 Cookie vs localStorage

**Decision: Cookies (already implemented correctly)**

The current codebase uses `@supabase/ssr` which stores tokens in HTTP cookies. This is the correct approach:

| Aspect | Cookie (current) | localStorage |
|--------|:-:|:-:|
| SSR access | O | X |
| XSS vulnerability | Low (httpOnly flag) | High |
| CSRF risk | Mitigated by SameSite=Lax | N/A |
| Middleware access | O | X |
| Mobile app compatibility | X (use secure storage) | X (use secure storage) |

For the Expo mobile app (`apps/mobile`), tokens should use `expo-secure-store` instead.

#### 2.3 Session Refresh Strategy

The current `middleware.ts` correctly calls `supabase.auth.getUser()` on every request. This triggers an implicit session refresh when the access token is expired:

```
Request arrives
  -> middleware.ts creates Supabase client with request cookies
  -> getUser() checks access token validity
  -> If expired: auto-refreshes using refresh token, sets new cookies
  -> If valid: passes through
  -> Updated cookies forwarded to response
```

**The cookie forwarding logic in the current middleware is correct** -- it reads from request cookies, and if tokens are refreshed, writes updated cookies to both the request (for downstream server components) and the response (for the browser).

#### 2.4 Token Expiry Configuration

**Recommended Supabase Dashboard settings:**

| Setting | Recommended Value | Rationale |
|---------|:-:|---------|
| JWT expiration | 3600 (1 hour) | Default, good balance |
| Refresh token rotation | Enabled | Already default |
| Refresh token reuse interval | 10 seconds | Prevents race conditions in concurrent requests |

Do NOT go below 300 seconds (5 minutes) for JWT expiration -- Supabase warns this causes excessive session churn and cleanup overhead.

---

### 3. Auth Middleware Design

#### 3.1 Performance Analysis of Current Middleware

**Current behavior:** `supabase.auth.getUser()` is called on EVERY request, including static assets, API routes, and public pages.

**Problem:** `getUser()` makes an HTTP call to the Supabase Auth server on every invocation. This adds 50-200ms latency per request depending on network conditions.

**Recommendation: Add route-based filtering**

```typescript
// apps/web/src/middleware.ts (root middleware)

import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '~/lib/supabase/middleware';

// Routes that don't need auth session refresh
const PUBLIC_STATIC_PATTERNS = [
  /^\/_next\//,        // Next.js internals
  /^\/favicon\.ico$/,
  /^\/.*\.(svg|png|jpg|ico|webp|css|js)$/,
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip session refresh for static assets
  if (PUBLIC_STATIC_PATTERNS.some(pattern => pattern.test(pathname))) {
    return NextResponse.next();
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

#### 3.2 Route Protection Matrix

| Route Pattern | Auth Required | Behavior |
|---------------|:-:|----------|
| `/` | No | Landing page, always public |
| `/auth/login` | No | Login page, redirect to `/dashboard` if authenticated |
| `/auth/callback` | No | OAuth callback handler |
| `/auth/error` | No | Auth error display |
| `/s/[token]` | No | Shared link (public access via token) |
| `/dashboard` | Yes | My templates list |
| `/template/new` | Yes | Create new template |
| `/template/[id]` | Yes | Edit own template |
| `/template/[id]/settle` | Yes | View settlement results |
| `/mypage` | Yes | Profile, history, settings |
| `/api/trpc/*` | Mixed | Per-procedure auth (publicProcedure vs protectedProcedure) |

#### 3.3 Enhanced Middleware with Redirect Logic

```typescript
// apps/web/src/lib/supabase/middleware.ts (enhanced)

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { CookieMethodsServer } from '@supabase/ssr';
import { createServerClient } from '@supabase/ssr';

const PROTECTED_ROUTES = ['/dashboard', '/template', '/mypage'];
const AUTH_ROUTES = ['/auth/login'];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: Parameters<
            NonNullable<CookieMethodsServer['setAll']>
          >[0],
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Redirect authenticated users away from login page
  if (user && AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Redirect unauthenticated users to login for protected routes
  if (!user && PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
```

---

### 4. Row Level Security (RLS) Policies

#### 4.1 Design Principles

1. **Enable RLS on ALL tables** -- even if accessed only through tRPC (defense in depth)
2. **Separate policies per operation** -- never use `FOR ALL`
3. **`templates.user_id` is the ownership root** -- all child table access derives from template ownership
4. **Wrap `auth.uid()` in a subselect** for optimizer caching: `(SELECT auth.uid())`
5. **Support NULL `user_id`** -- templates without a user are "anonymous" (pre-login)
6. **Shared link tokens bypass ownership** via a dedicated function

#### 4.2 Helper Function: Check Template Ownership

```sql
-- Helper function: returns true if the current user owns the given template
CREATE OR REPLACE FUNCTION public.is_template_owner(template_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.templates
    WHERE id = template_id
      AND user_id = (SELECT auth.uid())
  );
$$;
```

#### 4.3 Templates Table

```sql
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- SELECT: authenticated users can read their own templates
CREATE POLICY "templates_select_own"
  ON public.templates
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- INSERT: authenticated users can create templates under their own user_id
CREATE POLICY "templates_insert_own"
  ON public.templates
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

-- UPDATE: only the owner can update
CREATE POLICY "templates_update_own"
  ON public.templates
  FOR UPDATE
  TO authenticated
  USING (user_id = (SELECT auth.uid()))
  WITH CHECK (user_id = (SELECT auth.uid()));

-- DELETE: only the owner can delete
CREATE POLICY "templates_delete_own"
  ON public.templates
  FOR DELETE
  TO authenticated
  USING (user_id = (SELECT auth.uid()));
```

#### 4.4 Participants Table

```sql
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;

-- SELECT: via template ownership
CREATE POLICY "participants_select_via_template"
  ON public.participants
  FOR SELECT
  TO authenticated
  USING (public.is_template_owner(template_id));

-- INSERT: via template ownership
CREATE POLICY "participants_insert_via_template"
  ON public.participants
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_template_owner(template_id));

-- UPDATE: via template ownership
CREATE POLICY "participants_update_via_template"
  ON public.participants
  FOR UPDATE
  TO authenticated
  USING (public.is_template_owner(template_id))
  WITH CHECK (public.is_template_owner(template_id));

-- DELETE: via template ownership
CREATE POLICY "participants_delete_via_template"
  ON public.participants
  FOR DELETE
  TO authenticated
  USING (public.is_template_owner(template_id));
```

#### 4.5 Payments Table

```sql
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- SELECT: via template ownership
CREATE POLICY "payments_select_via_template"
  ON public.payments
  FOR SELECT
  TO authenticated
  USING (public.is_template_owner(template_id));

-- INSERT: via template ownership
CREATE POLICY "payments_insert_via_template"
  ON public.payments
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_template_owner(template_id));

-- UPDATE: via template ownership
CREATE POLICY "payments_update_via_template"
  ON public.payments
  FOR UPDATE
  TO authenticated
  USING (public.is_template_owner(template_id))
  WITH CHECK (public.is_template_owner(template_id));

-- DELETE: via template ownership
CREATE POLICY "payments_delete_via_template"
  ON public.payments
  FOR DELETE
  TO authenticated
  USING (public.is_template_owner(template_id));
```

#### 4.6 Payment Participants Table

```sql
ALTER TABLE public.payment_participants ENABLE ROW LEVEL SECURITY;

-- SELECT: via payment -> template ownership
CREATE POLICY "payment_participants_select_via_payment"
  ON public.payment_participants
  FOR SELECT
  TO authenticated
  USING (
    payment_id IN (
      SELECT id FROM public.payments
      WHERE public.is_template_owner(template_id)
    )
  );

-- INSERT: via payment -> template ownership
CREATE POLICY "payment_participants_insert_via_payment"
  ON public.payment_participants
  FOR INSERT
  TO authenticated
  WITH CHECK (
    payment_id IN (
      SELECT id FROM public.payments
      WHERE public.is_template_owner(template_id)
    )
  );

-- DELETE: via payment -> template ownership
CREATE POLICY "payment_participants_delete_via_payment"
  ON public.payment_participants
  FOR DELETE
  TO authenticated
  USING (
    payment_id IN (
      SELECT id FROM public.payments
      WHERE public.is_template_owner(template_id)
    )
  );
```

#### 4.7 Shared Links Table

```sql
ALTER TABLE public.shared_links ENABLE ROW LEVEL SECURITY;

-- SELECT: template owner can see their shared links
CREATE POLICY "shared_links_select_own"
  ON public.shared_links
  FOR SELECT
  TO authenticated
  USING (public.is_template_owner(template_id));

-- INSERT: template owner can create shared links
CREATE POLICY "shared_links_insert_own"
  ON public.shared_links
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_template_owner(template_id));

-- UPDATE: template owner can update (e.g., toggle readonly, set expiry)
CREATE POLICY "shared_links_update_own"
  ON public.shared_links
  FOR UPDATE
  TO authenticated
  USING (public.is_template_owner(template_id))
  WITH CHECK (public.is_template_owner(template_id));

-- DELETE: template owner can revoke shared links
CREATE POLICY "shared_links_delete_own"
  ON public.shared_links
  FOR DELETE
  TO authenticated
  USING (public.is_template_owner(template_id));

-- SELECT for anonymous: anyone with a valid token can read
-- (This is for the shared link public access path)
CREATE POLICY "shared_links_select_by_token"
  ON public.shared_links
  FOR SELECT
  TO anon
  USING (true);
  -- Note: actual token validation happens in the tRPC endpoint.
  -- The anon role can read shared_links rows but must provide a valid token
  -- via the API layer. This is intentional -- the shared link lookup
  -- by token is the access control mechanism itself.
```

#### 4.8 Shared Link Public Access Policies

For shared links, anonymous users need to read template data. These policies use a helper function that validates shared link tokens:

```sql
-- Helper function: check if a valid, non-expired shared link exists for a template
CREATE OR REPLACE FUNCTION public.has_valid_shared_link(p_template_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.shared_links
    WHERE template_id = p_template_id
      AND (expires_at IS NULL OR expires_at > now())
  );
$$;

-- Anonymous read access via shared links
CREATE POLICY "templates_select_via_shared_link"
  ON public.templates
  FOR SELECT
  TO anon
  USING (public.has_valid_shared_link(id));

CREATE POLICY "participants_select_via_shared_link"
  ON public.participants
  FOR SELECT
  TO anon
  USING (public.has_valid_shared_link(template_id));

CREATE POLICY "payments_select_via_shared_link"
  ON public.payments
  FOR SELECT
  TO anon
  USING (public.has_valid_shared_link(template_id));

CREATE POLICY "payment_participants_select_via_shared_link"
  ON public.payment_participants
  FOR SELECT
  TO anon
  USING (
    payment_id IN (
      SELECT id FROM public.payments
      WHERE public.has_valid_shared_link(template_id)
    )
  );
```

#### 4.9 Required Indexes for RLS Performance

```sql
-- Essential indexes for RLS policy performance
CREATE INDEX IF NOT EXISTS idx_templates_user_id ON public.templates(user_id);
CREATE INDEX IF NOT EXISTS idx_participants_template_id ON public.participants(template_id);
CREATE INDEX IF NOT EXISTS idx_payments_template_id ON public.payments(template_id);
CREATE INDEX IF NOT EXISTS idx_payment_participants_payment_id ON public.payment_participants(payment_id);
CREATE INDEX IF NOT EXISTS idx_shared_links_template_id ON public.shared_links(template_id);
CREATE INDEX IF NOT EXISTS idx_shared_links_token ON public.shared_links(token);
CREATE INDEX IF NOT EXISTS idx_shared_links_expires_at ON public.shared_links(expires_at) WHERE expires_at IS NOT NULL;
```

---

### 5. Guest -> Authenticated User Migration

#### 5.1 Problem Statement

Per the business plan, users MUST be able to create templates without logging in ("비로그인 사용 필수 보장"). The login is only prompted when they want to "permanently save" their data. This means:
- Anonymous usage creates data in localStorage
- When user signs up, localStorage data must be migrated to the DB under their new `user_id`

#### 5.2 localStorage Data Schema (frontend concern)

Frontend should store templates in localStorage with this structure:

```typescript
interface LocalTemplate {
  localId: string; // nanoid or UUID generated client-side
  name: string;
  participants: Array<{
    localId: string;
    name: string;
    tagColor: string;
  }>;
  payments: Array<{
    localId: string;
    title: string;
    amount: number;
    payerLocalId: string;
    participantLocalIds: string[];
  }>;
  createdAt: string; // ISO 8601
  updatedAt: string;
}

// Key: 'calpayment:templates'
// Value: LocalTemplate[]
```

#### 5.3 Migration Flow

```
User has localStorage data
  -> User clicks "카카오 로그인" (or Google / Apple)
  -> OAuth flow completes, user authenticated
  -> Redirect to /auth/callback -> /dashboard
  -> Dashboard page detects localStorage data exists
  -> Shows modal: "이전에 만든 모임 N개를 발견했습니다. 계정에 저장할까요?"
  -> User confirms -> calls template.importBatch mutation
  -> On success: clear localStorage, show migrated data
  -> On decline: clear localStorage (data lost) or keep for later
```

#### 5.4 Batch Import tRPC Endpoint

```typescript
// packages/api/src/router/template.ts - new endpoint

/** 로컬 데이터 일괄 가져오기 (guest -> authenticated migration) */
importBatch: protectedProcedure
  .input(z.object({
    templates: z.array(z.object({
      name: z.string().min(1).max(50),
      participants: z.array(z.object({
        localId: z.string(),
        name: z.string().min(1),
        tagColor: z.string(),
      })),
      payments: z.array(z.object({
        title: z.string().min(1),
        amount: z.number().int().positive(),
        payerLocalId: z.string(),
        participantLocalIds: z.array(z.string()).min(1),
      })),
    })).max(50), // Prevent abuse: max 50 templates per import
  }))
  .mutation(async ({ ctx, input }) => {
    const results = [];

    for (const tpl of input.templates) {
      // Use a transaction per template
      const result = await ctx.db.transaction(async (tx) => {
        // 1. Create template
        const [template] = await tx.insert(templates).values({
          name: tpl.name,
          userId: ctx.user.id,
        }).returning();

        if (!template) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

        // 2. Create participants, mapping localId -> DB id
        const localIdToDbId = new Map<string, string>();
        for (const p of tpl.participants) {
          const [participant] = await tx.insert(participants).values({
            templateId: template.id,
            name: p.name,
            tagColor: p.tagColor,
          }).returning();
          if (participant) {
            localIdToDbId.set(p.localId, participant.id);
          }
        }

        // 3. Create payments with participant mappings
        for (const pay of tpl.payments) {
          const payerDbId = localIdToDbId.get(pay.payerLocalId);
          if (!payerDbId) continue;

          const [payment] = await tx.insert(payments).values({
            templateId: template.id,
            title: pay.title,
            amount: pay.amount,
            payerId: payerDbId,
          }).returning();

          if (payment) {
            const ppValues = pay.participantLocalIds
              .map(lid => localIdToDbId.get(lid))
              .filter(Boolean)
              .map(dbId => ({
                paymentId: payment.id,
                participantId: dbId!,
              }));

            if (ppValues.length > 0) {
              await tx.insert(paymentParticipants).values(ppValues);
            }
          }
        }

        return template;
      });

      results.push(result);
    }

    return results;
  }),
```

#### 5.5 Existing User Data Migration (from old Dutch Pay app)

The ARCHITECTURE.md mentions detecting existing localStorage data from the old Vite SPA. The frontend team should:

1. On first load, check for the old localStorage key format
2. Transform old data to the `LocalTemplate` schema above
3. Follow the same importBatch flow
4. Clear old localStorage keys after successful migration

---

### 6. Shared Link Auth

#### 6.1 Architecture

Shared links provide **public read-only** (or optionally editable) access to a template's settlement results WITHOUT requiring login.

```
Template Owner creates shared link
  -> Server generates cryptographically random token (nanoid, 21 chars)
  -> Stores in shared_links table with template_id, is_readonly, expires_at
  -> Returns URL: https://calpayment.kr/s/{token}

Anyone with the link
  -> Visits /s/{token}
  -> Server looks up shared_links WHERE token = {token}
  -> Validates: not expired, link exists
  -> Fetches template + participants + payments via templateId
  -> Renders read-only settlement results
  -> Shows CTA: "나도 정산하기" -> app download / web usage
```

#### 6.2 Token Generation

```typescript
import { nanoid } from 'nanoid';

// 21 characters, URL-safe, ~128 bits of entropy
// Collision probability: need ~2^64 tokens for 50% chance of collision
const token = nanoid(); // e.g., "V1StGXR8_Z5jdHi6B-myT"
```

#### 6.3 Shared Link tRPC Endpoints

```typescript
// packages/api/src/router/sharedLink.ts

export const sharedLinkRouter = {
  /** Create shared link for a template */
  create: protectedProcedure
    .input(z.object({
      templateId: z.string().uuid(),
      isReadonly: z.boolean().default(true),
      expiresInDays: z.number().int().min(1).max(365).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Verify template ownership
      const template = await ctx.db.query.templates.findFirst({
        where: and(
          eq(templates.id, input.templateId),
          eq(templates.userId, ctx.user.id),
        ),
      });
      if (!template) throw new TRPCError({ code: 'NOT_FOUND' });

      const token = nanoid();
      const expiresAt = input.expiresInDays
        ? new Date(Date.now() + input.expiresInDays * 86400000)
        : null;

      const [link] = await ctx.db.insert(sharedLinks).values({
        templateId: input.templateId,
        token,
        isReadonly: input.isReadonly,
        expiresAt,
      }).returning();

      return link;
    }),

  /** Resolve a shared link token (public, no auth required) */
  resolve: publicProcedure
    .input(z.object({ token: z.string().min(1).max(100) }))
    .query(async ({ ctx, input }) => {
      const link = await ctx.db.query.sharedLinks.findFirst({
        where: eq(sharedLinks.token, input.token),
        with: {
          template: {
            with: {
              participants: true,
              payments: {
                with: {
                  payer: true,
                  participants: {
                    with: { participant: true },
                  },
                },
              },
            },
          },
        },
      });

      if (!link) throw new TRPCError({ code: 'NOT_FOUND', message: '링크를 찾을 수 없습니다.' });

      // Check expiry
      if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
        throw new TRPCError({ code: 'FORBIDDEN', message: '만료된 링크입니다.' });
      }

      return {
        template: link.template,
        isReadonly: link.isReadonly,
        expiresAt: link.expiresAt,
      };
    }),

  /** Revoke a shared link */
  delete: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(sharedLinks).where(
        and(
          eq(sharedLinks.id, input),
          // Ensure ownership via subquery
          inArray(sharedLinks.templateId,
            ctx.db.select({ id: templates.id }).from(templates)
              .where(eq(templates.userId, ctx.user.id))
          ),
        ),
      );
    }),

  /** List shared links for a template */
  listByTemplate: protectedProcedure
    .input(z.object({ templateId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.sharedLinks.findMany({
        where: and(
          eq(sharedLinks.templateId, input.templateId),
          // Ownership check via template
          inArray(sharedLinks.templateId,
            ctx.db.select({ id: templates.id }).from(templates)
              .where(eq(templates.userId, ctx.user.id))
          ),
        ),
        orderBy: desc(sharedLinks.createdAt),
      });
    }),
};
```

#### 6.4 How Shared Links Interact with RLS

Since tRPC endpoints use the `POSTGRES_URL` connection string (with the Drizzle client), they bypass RLS. RLS applies only when using the Supabase client with the `anon` or `authenticated` key.

**However**, RLS is still valuable as defense-in-depth:
- If the frontend ever directly queries Supabase (e.g., Realtime subscriptions)
- If a developer accidentally exposes the Supabase client in client-side code
- For the shared link public access path, the `anon` RLS policies defined in section 4.8 apply

**Important architecture note:** The current setup uses Drizzle with `postgres.js` directly, which connects as a database role that is NOT subject to RLS. For RLS to work, queries must go through the Supabase PostgREST API (the `anon`/`authenticated` key path). Our tRPC layer provides its own authorization via `protectedProcedure`, so both layers complement each other.

If the team ever wants to add Supabase Realtime for live collaboration, those connections WILL go through PostgREST and WILL be subject to RLS -- at that point the policies above become essential.

---

## Deliverable 2: Frontend Architecture Advice

---

### 7. Data Fetching Pattern Recommendations

#### 7.1 Server-Side Prefetching

The current `apps/web/src/trpc/server.tsx` already has a `prefetch()` helper using `HydrationBoundary`. Here is what should be prefetched:

| Page | Prefetch Query | Rationale |
|------|---------------|-----------|
| `/dashboard` | `template.list` | Critical path -- user sees their templates immediately on load |
| `/template/[id]` | `template.byId` | Template data needed before any interaction |
| `/template/[id]/settle` | `settlement.calculate` | Settlement results are the primary content |
| `/s/[token]` | `sharedLink.resolve` | Shared page must render immediately for SEO and sharing previews |

```typescript
// Example: apps/web/src/app/dashboard/page.tsx
import { prefetch, HydrateClient, trpc } from '~/trpc/server';

export default async function DashboardPage() {
  prefetch(trpc.template.list.queryOptions());

  return (
    <HydrateClient>
      <DashboardClient />
    </HydrateClient>
  );
}
```

#### 7.2 Optimistic Updates

These mutations should use optimistic updates for perceived speed:

| Mutation | Optimistic Strategy |
|----------|-------------------|
| `template.create` | Add new template card to list immediately with placeholder ID |
| `template.delete` | Remove from list immediately, restore on error |
| `payment.create` | Add payment card, recalculate settlement client-side |
| `payment.delete` | Remove payment card, recalculate settlement client-side |
| Participant add/remove | Update participant list immediately |

The `@dutch/core/settlement` package contains pure functions (`calculateSettlement`, `calculateReceiveSummary`) that can run client-side for instant settlement recalculation during optimistic updates.

#### 7.3 Cache Invalidation Strategy

```typescript
// After template mutation
utils.template.list.invalidate();
utils.template.byId.invalidate({ id: templateId });

// After payment mutation
utils.payment.listByTemplate.invalidate({ templateId });
utils.settlement.calculate.invalidate({ templateId });
utils.template.byId.invalidate({ id: templateId }); // because byId includes payments

// After participant mutation
utils.template.byId.invalidate({ id: templateId });
utils.payment.listByTemplate.invalidate({ templateId }); // participant data embedded
utils.settlement.calculate.invalidate({ templateId });
```

**Stale time recommendations:**
- `template.list`: 30 seconds (user might create templates from another device)
- `template.byId`: 60 seconds (within a session, data changes are local)
- `settlement.calculate`: Infinity (only changes when payments change, invalidate manually)
- `sharedLink.resolve`: 5 minutes (shared links rarely change)

#### 7.4 Error Handling Patterns

```typescript
// Recommended error boundary structure
// 1. tRPC-level: use onError in useMutation
const createPayment = api.payment.create.useMutation({
  onError: (error) => {
    if (error.data?.zodError) {
      // Validation error -> show field-level errors
      toast.error('입력값을 확인해주세요.');
    } else if (error.data?.code === 'UNAUTHORIZED') {
      // Session expired -> redirect to login
      router.push('/auth/login');
    } else {
      // Generic server error
      toast.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  },
});

// 2. Global error handler in TRPCReactProvider
// apps/web/src/trpc/react.tsx
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        // Global mutation error handler
      },
    },
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on auth errors
        if (error instanceof TRPCClientError && error.data?.code === 'UNAUTHORIZED') {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});
```

---

### 8. Offline-First Considerations

#### 8.1 Core Calculation: Yes, It Can Work Offline

The `@dutch/core/settlement` package is already a pure function library with zero server dependencies. The frontend can:

1. Accept participant and payment inputs client-side
2. Run `calculateSettlement()` and `calculateReceiveSummary()` entirely in the browser
3. Display results immediately without any network call

This is the MVP approach and matches the business plan's "비로그인 사용 필수 보장" requirement.

#### 8.2 localStorage as Cache

```typescript
// Recommended localStorage structure for offline-capable usage
const STORAGE_KEY = 'calpayment:templates';
const STORAGE_VERSION = 1;

interface StorageData {
  version: number;
  templates: LocalTemplate[];
  lastSyncAt: string | null; // ISO timestamp of last successful DB sync
}
```

**When to use localStorage vs DB:**
- **Not logged in**: localStorage is the primary (and only) data store
- **Logged in, online**: DB is the source of truth, localStorage is a read cache
- **Logged in, offline**: Read from localStorage cache, queue writes for sync

#### 8.3 Sync Strategy

For the MVP, offline sync can be simple:

```
App loads
  -> If logged in:
    -> Try to fetch from DB (tRPC)
    -> On success: update localStorage cache
    -> On failure (offline): use localStorage cache, show "offline" indicator
  -> If not logged in:
    -> Use localStorage only
```

Full offline-first with conflict resolution (CRDTs, etc.) is a P2 feature. For MVP, the "last write wins" approach is sufficient since concurrent editing of the same template is unlikely.

#### 8.4 Conflict Resolution (Future - P1/P2)

When real-time collaboration is introduced (P1: "실시간 동기화"), conflicts will need handling:

| Scenario | Resolution |
|----------|-----------|
| Two users add payments to same template | No conflict -- both get appended |
| Two users edit the same payment amount | Last write wins (with timestamp) |
| One user deletes a payment another is editing | Delete wins, show notification |
| Template name changed by two users | Last write wins |

Supabase Realtime (PostgreSQL `LISTEN/NOTIFY` via WebSockets) is the right tool for this. It will use the RLS policies defined in section 4 to scope which changes each user can subscribe to.

---

### 9. API Gap Analysis

#### 9.1 Missing Endpoints

| Priority | Endpoint | Router | Rationale |
|:---:|---------|--------|-----------|
| P0 | `participant.create` | participant | Currently no way to add participants via API |
| P0 | `participant.delete` | participant | Required for the participant management step |
| P0 | `sharedLink.create` | sharedLink | Entire shared link CRUD (section 6.3 above) |
| P0 | `sharedLink.resolve` | sharedLink | Public shared link access |
| P1 | `template.update` | template | Template name update (schema exists in validators but no endpoint) |
| P1 | `payment.update` | payment | Payment editing (amount, title, participants) |
| P1 | `template.importBatch` | template | Guest -> authenticated migration (section 5.4) |
| P1 | `participant.updateBulk` | participant | Reorder or batch update participant colors |
| P2 | `template.duplicate` | template | Copy a template as starting point |
| P2 | `template.archive` | template | Soft delete / archive old templates |

#### 9.2 Input Validation Gaps

**Current issues found:**

1. **`template.delete`**: No ownership check. Any user knowing a template UUID can delete it.
   ```typescript
   // Current: dangerous
   delete: protectedProcedure
     .input(z.string().uuid())
     .mutation(({ ctx, input }) => {
       return ctx.db.delete(templates).where(eq(templates.id, input));
       // Missing: AND user_id = ctx.user.id
     }),
   ```

   **Fix:**
   ```typescript
   delete: protectedProcedure
     .input(z.string().uuid())
     .mutation(({ ctx, input }) => {
       return ctx.db.delete(templates).where(
         and(eq(templates.id, input), eq(templates.userId, ctx.user.id))
       );
     }),
   ```

2. **`payment.create`**: No ownership verification. Anyone can add payments to any template.
   ```typescript
   // Should verify: template belongs to ctx.user before inserting
   ```

3. **`payment.delete`**: No ownership verification. Anyone can delete any payment.

4. **`template.byId`**: Public procedure with no access control. Anyone with a UUID can read any template. This should either:
   - Be a `protectedProcedure` with ownership check, OR
   - Have a separate public variant gated by shared link token

5. **`payment.create`**: The `participantIds` are not validated to belong to the same template. A malicious user could link a payment to participants from a different template.

6. **`settlement.calculate`**: Public procedure, anyone with a template UUID can calculate. This leaks financial data. Should be protected or gated by shared link token.

#### 9.3 Response Shape Improvements

1. **`template.create`** returns an array (from `.returning()`) but semantically creates a single template. Should unwrap: `return result[0]`.

2. **`template.byId`** returns `undefined` when not found instead of throwing `TRPCError({ code: 'NOT_FOUND' })`. The frontend has to handle both `null` and `undefined` returns.

3. **`settlement.calculate`** returns `null` when template not found. Should throw `NOT_FOUND` for consistent error handling.

4. **All list endpoints** are missing pagination. For MVP this is fine, but add cursor-based pagination before the template count grows:
   ```typescript
   .input(z.object({
     cursor: z.string().uuid().optional(),
     limit: z.number().min(1).max(50).default(20),
   }))
   ```

#### 9.4 Additional Recommendations

1. **Add `updatedAt` to responses**: The `templates.updatedAt` field exists in the schema but ensure it's included in query results for cache busting.

2. **Consistent ID referencing**: The `paymentRouter` uses `participantId` (UUID references to the DB), but the validators in `@dutch/core` use `payerName` (string). This inconsistency will cause confusion. The API layer should use UUIDs; the core settlement functions use names. The mapping between them (already done in `settlementRouter`) is correct but should be documented.

3. **Amount validation**: The `payments.amount` is `integer()` (Drizzle) and `z.number().int().positive()` (Zod), but there's no upper bound. Add `.max(100_000_000)` (1 billion won) to prevent integer overflow edge cases.

---

### 10. Security Considerations

#### 10.1 CSRF Protection

**Current status: Adequately protected.**

Supabase's `@supabase/ssr` package uses cookies with `SameSite=Lax` by default, which prevents most CSRF attacks. The tRPC endpoint (`/api/trpc/[trpc]/route.ts`) only accepts GET and POST -- GET for queries (read-only, safe), POST for mutations (protected by SameSite).

**However**, there is an issue in the current CORS headers:

```typescript
// Current: TOO PERMISSIVE
res.headers.set("Access-Control-Allow-Origin", "*");
```

This allows any website to make requests to the API. For the web app, this should be restricted:

```typescript
// Recommended
const ALLOWED_ORIGINS = [
  'https://calpayment.kr',
  'https://dutch-pay.vercel.app',
  process.env.NODE_ENV === 'development' && 'http://localhost:3000',
].filter(Boolean);

const setCorsHeaders = (res: Response, req: Request) => {
  const origin = req.headers.get('origin');
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin);
  }
  res.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.headers.set('Access-Control-Allow-Credentials', 'true');
};
```

The wildcard `*` is needed for the Expo mobile app (which sends requests from `exp://` origin). If the mobile app is a concern, use a separate API endpoint or check for a custom header.

#### 10.2 Rate Limiting

**Critical for shared links.** Without rate limiting, someone could:
- Brute-force shared link tokens (21-char nanoid makes this infeasible, but still good practice)
- Scrape settlement data
- DDoS the settlement calculation endpoint

**Recommendations:**

1. **Vercel Edge Middleware Rate Limiting** (simplest):
   ```typescript
   // Use @vercel/kv or Upstash Redis for distributed rate limiting
   // 100 requests per minute per IP for /s/* routes
   // 30 requests per minute per IP for /api/trpc/* routes
   ```

2. **Supabase-level**: Supabase has built-in rate limiting on the Auth endpoints. No action needed there.

3. **Application-level** (for tRPC): Add a rate limiting middleware:
   ```typescript
   // packages/api/src/trpc.ts
   const rateLimitMiddleware = t.middleware(async ({ ctx, next, path }) => {
     // For public procedures, rate limit by IP
     // For protected procedures, rate limit by user ID
     // Use a simple in-memory store for dev, Redis for prod
     return next();
   });
   ```

#### 10.3 Input Sanitization

**Current status: Partially handled.**

- Zod schemas validate types and basic constraints
- Drizzle ORM uses parameterized queries (SQL injection safe)

**Gaps:**
1. **No HTML sanitization**: If template names, participant names, or payment titles contain HTML/script tags, they could cause XSS when rendered. Add:
   ```typescript
   const safeString = z.string().transform(s => s.replace(/<[^>]*>/g, ''));
   ```
   Or better, ensure React's JSX escaping handles this (it does by default, but be careful with `dangerouslySetInnerHTML`).

2. **Unicode edge cases**: Korean names can include special characters. Test with names like `이름\u200B` (zero-width space) that could cause display issues.

3. **Template name length**: Already limited to 50 chars. Good.

#### 10.4 SQL Injection Prevention

**Status: Safe.**

Drizzle ORM generates parameterized queries. The `eq()`, `and()`, `inArray()` helpers all produce `$1`, `$2` placeholders. No raw SQL is used in any router.

The one area to watch: if the team ever uses `sql` template literals from Drizzle:
```typescript
// Safe - Drizzle parameterizes this
sql`SELECT * FROM templates WHERE id = ${input.id}`

// DANGEROUS - never do this
sql.raw(`SELECT * FROM templates WHERE id = '${input.id}'`)
```

#### 10.5 Additional Security Recommendations

1. **Environment Variables**: The `SUPABASE_SERVICE_ROLE_KEY` is defined in `env.ts` but not used anywhere currently. This key bypasses RLS. NEVER expose it to the client. If it's ever needed (e.g., for admin operations), use it ONLY in server-side code with explicit role checking.

2. **Shared Link Token Entropy**: 21-character nanoid provides ~126 bits of entropy. This is sufficient -- brute-forcing would require ~2^63 attempts to find a collision. No additional token obfuscation needed.

3. **Session Hijacking**: Supabase handles this via short-lived JWTs + refresh token rotation. The `@supabase/ssr` cookie configuration should explicitly set:
   ```
   SameSite: Lax
   Secure: true (in production)
   HttpOnly: true (for refresh token)
   Path: /
   ```
   These are the defaults in `@supabase/ssr`.

4. **API Key Exposure**: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are intentionally public (the `anon` key is designed to be exposed). Security comes from RLS policies, not key secrecy.

---

## Summary: Priority Action Items for the Team

### Immediate (Before UI development)

1. **Create `/auth/callback/route.ts`** -- Required for any OAuth login to work
2. **Create root `middleware.ts`** -- Currently missing; the `updateSession` function exists but is never called
3. **Fix authorization gaps** in `template.delete`, `payment.create`, `payment.delete` (section 9.2)
4. **Restrict CORS** from wildcard `*` to specific origins
5. **Add `participant` router** with CRUD operations
6. **Add `sharedLink` router** with create/resolve/delete

### Before Launch

7. **Apply RLS policies** (section 4) to all tables
8. **Configure OAuth providers** in Supabase Dashboard (Kakao, Google, Apple)
9. **Add rate limiting** on public endpoints
10. **Implement `importBatch`** for guest -> authenticated migration
11. **Add pagination** to list endpoints

### Post-Launch (P1)

12. Set up Supabase Realtime for live collaboration
13. Implement proper offline sync
14. Add Apple secret key rotation automation (every 6 months)

---

## References

- [Supabase Kakao OAuth Docs](https://supabase.com/docs/guides/auth/social-login/auth-kakao)
- [Supabase Google OAuth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Supabase Apple Sign In Docs](https://supabase.com/docs/guides/auth/social-login/auth-apple)
- [Supabase Server-Side Auth for Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase RLS Docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase RLS Performance Best Practices](https://supabase.com/docs/guides/troubleshooting/rls-performance-and-best-practices-Z5Jjwv)
- [Supabase Session Management](https://supabase.com/docs/guides/auth/sessions)
- [Supabase PKCE Flow](https://supabase.com/docs/guides/auth/sessions/pkce-flow)
- [Supabase getUser() Performance Discussion](https://github.com/orgs/supabase/discussions/20905)
- [Kakao Login REST API Docs](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)
