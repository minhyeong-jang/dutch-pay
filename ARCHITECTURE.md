# Dutch Pay (CalPayment) - 프로젝트 아키텍처 문서

## 1. 프로젝트 개요

기존 클라이언트 전용 더치페이 계산기를 백엔드 + 인증 + DB 연동된 풀스택 모바일 앱으로 전환하는 프로젝트.

- **현재 상태**: React + Vite SPA, localStorage 기반, GitHub Pages/Vercel 배포
- **목표**: 백엔드 연동, 사용자 인증, 데이터 영속화, 모바일 앱 출시, 수익화

## 2. 기술 스택

| 영역 | 기술 | 비고 |
|------|------|------|
| 모노레포 | Turborepo + pnpm | create-t3-turbo 기반 |
| 웹 | Next.js 15 (App Router, React 19) | SSR/SEO 지원 |
| 모바일 | Expo SDK 54 (React Native 0.81) | EAS Build로 앱스토어 배포 |
| API | tRPC v11 | 웹/앱 타입 공유 |
| ORM | Drizzle ORM | SQL 제어력 + 학습 목적 |
| DB | Supabase (PostgreSQL) | 무료 티어, 호스팅 불필요 |
| 인증 | Supabase Auth | DB와 통합, RLS 지원 |
| 웹 UI | Tailwind CSS v4 + shadcn/ui | 컴포넌트 라이브러리 |
| 앱 UI | NativeWind v5 | Tailwind 문법 통일 |
| 검증 | Zod | tRPC input + 폼 검증 |
| 배포 (웹) | Vercel | Next.js 최적 |
| 배포 (앱) | EAS Build | Expo 공식 |

### 기술 선택 근거

#### Supabase Auth (Better Auth 대신)
- Supabase를 DB로 사용하므로 별도 인증 라이브러리는 중복
- Row Level Security(RLS) 통합 가능
- 소셜 로그인(카카오, 구글, 애플) 기본 지원

#### Drizzle ORM (Prisma 대신)
- SQL에 가까운 제어력, ~7KB 번들 사이즈
- 학습 목적 포함 (개발자 의사결정)
- 0.x 버전이지만 주간 460만+ 다운로드로 프로덕션 검증됨

#### NativeWind + shadcn/ui (Tamagui 대신)
- Tailwind 문법 통일로 인지 부하 감소
- create-t3-turbo 기본값, 자료가 압도적으로 많음
- Tamagui는 학습 곡선이 높고 커뮤니티가 NativeWind의 1/5 수준

## 3. 프로젝트 구조

```
dutch-pay/
├── apps/
│   ├── web/                  # Next.js 15 웹 애플리케이션
│   │   ├── src/
│   │   │   ├── app/          # App Router 페이지
│   │   │   ├── components/   # 웹 전용 UI 컴포넌트
│   │   │   └── lib/          # 웹 전용 유틸리티
│   │   └── ...
│   │
│   └── mobile/               # Expo 모바일 애플리케이션
│       ├── src/
│       │   ├── app/          # Expo Router 페이지
│       │   ├── components/   # 앱 전용 UI 컴포넌트
│       │   └── lib/          # 앱 전용 유틸리티
│       └── ...
│
├── packages/
│   ├── api/                  # tRPC v11 라우터
│   │   ├── src/
│   │   │   ├── router/       # 도메인별 라우터 (template, payment, settlement)
│   │   │   ├── trpc.ts       # tRPC 인스턴스
│   │   │   └── root.ts       # 루트 라우터
│   │   └── ...
│   │
│   ├── core/                 # 공유 비즈니스 로직
│   │   ├── src/
│   │   │   ├── settlement/   # 정산 알고리즘 (순수 함수)
│   │   │   ├── types/        # 공유 타입 정의
│   │   │   └── validators/   # Zod 스키마
│   │   └── ...
│   │
│   └── db/                   # Drizzle ORM + Supabase
│       ├── src/
│       │   ├── schema/       # Drizzle 테이블 스키마
│       │   ├── migrations/   # DB 마이그레이션
│       │   └── client.ts     # DB 클라이언트
│       └── ...
│
├── tooling/                  # 공유 설정
│   ├── eslint/
│   ├── prettier/
│   ├── tailwind/
│   └── typescript/
│
├── turbo.json
├── package.json              # pnpm workspaces
└── ARCHITECTURE.md           # 이 문서
```

## 4. DB 스키마

```sql
-- Supabase Auth가 관리하는 users 테이블 (auth.users)

-- 정산 템플릿 (모임 단위)
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL DEFAULT 'New Template',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 참가자
CREATE TABLE participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tag_color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 결제 건
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount INTEGER NOT NULL,          -- 원 단위 정수
  payer_id UUID REFERENCES participants(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 결제 참여자 (다대다)
CREATE TABLE payment_participants (
  payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES participants(id) ON DELETE CASCADE,
  PRIMARY KEY (payment_id, participant_id)
);

-- 공유 링크
CREATE TABLE shared_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  is_readonly BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 5. 마이그레이션 전략

### 기존 코드 → 신규 구조

| 기존 | 이동 위치 | 변경 사항 |
|------|----------|----------|
| `CalculateContainer` 정산 로직 | `packages/core/settlement/` | 순수 함수로 추출, useEffect 제거 |
| `types/` (Template, Payment, User) | `packages/db/schema/` | Drizzle 스키마로 전환 |
| `utils/payment.ts`, `utils/template.ts` | `packages/core/` | 서버사이드 유틸리티로 이동 |
| Redux (template.ts) | 제거 | tRPC + React Query로 대체 |
| localStorage 저장 | 제거 | Supabase DB로 대체 |
| UI 컴포넌트 | `apps/web/`, `apps/mobile/` | 각 플랫폼에 맞게 재구현 |

### 기존 사용자 데이터
- 기존 localStorage 데이터는 첫 방문 시 감지하여 DB로 import하는 마이그레이션 플로우 제공
- 로그인 후 "기존 데이터 가져오기" 기능으로 구현

## 6. 의도적 제외 사항

| 제외 항목 | 이유 |
|-----------|------|
| `packages/ui` (공유 UI) | 웹(`div`)과 앱(`View`)의 근본적 차이로 실질적 공유 불가 |
| `packages/validators` | `packages/core`에 Zod 스키마 통합 |
| `packages/auth` | Supabase Auth 직접 사용, 별도 패키지 불필요 |
| Tamagui | 학습 대상 과다, 커뮤니티 규모 부족 |
| Prisma | Drizzle 학습 목적 (개발자 의사결정) |
| Better Auth / NextAuth | Supabase Auth와 기능 중복 |

## 7. 배포 전략

### 웹 (Vercel)
- `apps/web` 디렉토리를 Vercel에 연결
- Turborepo의 remote caching 활용
- Preview 배포로 PR별 확인

### 모바일 (EAS Build)
- `apps/mobile` 디렉토리에서 EAS Build 실행
- OTA 업데이트로 빠른 패치
- 앱스토어 제출은 EAS Submit 활용
