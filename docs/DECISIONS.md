# CalPayment 설계 결정 기록 (ADR)

> Phase 2 팀 미팅에서 결정된 사항. 모든 팀원은 이 문서를 기준으로 구현한다.
> 작성일: 2026-02-23

---

## 1. MVP 데이터 전략

### 결정: localStorage 기반 store + tRPC 호환 인터페이스

**v1.0은 서버 연동 없이 100% 클라이언트에서 동작한다.**

- UI 컴포넌트는 커스텀 훅(`useTemplates`, `useTemplate`)을 통해 데이터 접근
- 내부적으로 localStorage에 저장/로드
- 인터페이스를 tRPC query/mutation과 동일하게 설계
- v1.1에서 Supabase 연동 시 훅 내부만 교체, UI 코드 변경 없음

```
v1.0: UI → hooks → localStorage
v1.1: UI → hooks → tRPC → Supabase DB
```

**localStorage 스키마:**
```typescript
// Key: 'calpayment:templates'
interface LocalTemplate {
  id: string;          // nanoid
  name: string;
  participants: Array<{ id: string; name: string; tagColor: string }>;
  payments: Array<{
    id: string;
    title: string;
    amount: number;
    payerId: string;
    participantIds: string[];
  }>;
  createdAt: string;
  updatedAt: string;
}
```

### 근거
- PM: "비로그인으로 모든 핵심 기능 사용 가능" 필수
- Frontend 1: mock store 방식으로 나중에 스왑 가능
- Backend: guest → authenticated 마이그레이션 설계 완료

---

## 2. 디자인 시스템

### Primary Color: Deep Teal `#0D9488`
- 모든 한국 핀테크가 Blue를 사용 (Toss, KakaoPay, 신한)
- Teal = 신뢰(blue) + 돈/완료(green) 중간
- oklch: `oklch(0.5955 0.1175 180.72)`

### Typography: Pretendard
- Geist 폰트 → Pretendard로 교체
- 한국 정부 공식 웹 UI 서체, Inter + Source Han Sans 기반
- Variable font, `next/font/local`로 로딩

### Dark Mode: Day 1 지원
- CSS 변수 구조 이미 준비됨 (`@custom-variant dark`)
- 시스템 설정 감지 + 수동 토글

### 참가자 색상: Designer 10색 팔레트
```
Teal #0D9488, Coral #F97316, Violet #8B5CF6, Rose #F43F5E, Sky #0EA5E9
Amber #D97706, Emerald #059669, Fuchsia #C026D3, Slate #64748B, Lime #65A30D
```

### 정산 시맨틱 색상
- 받을 돈: `--success` (#10B981, green)
- 보낼 돈: `--destructive` (#EF4444, red)
- 대기 중: `--warning` (#F59E0B, amber)

---

## 3. 금액 입력 컴포넌트

### 결정: 네이티브 numpad + 빠른 금액 버튼

**Designer의 커스텀 넘패드 제안 보류 (v1.0)**

Frontend 2 의견 채택:
- `inputMode="numeric"` → OS 기본 넘패드 호출
- 실시간 천 단위 콤마 포맷팅
- 고정 "원" 접미사
- 하단 빠른 금액 버튼: `+1천`, `+5천`, `+1만`, `+5만` (additive)

### 근거
- 커스텀 넘패드: iOS/Android 브라우저별 호환성 이슈, 구현 복잡도 높음
- 네이티브 넘패드: 사용자 익숙, 안정적, IME 문제 없음
- 빠른 금액 버튼이 커스텀 넘패드의 핵심 장점(효율성)을 대체

---

## 4. 페이지 구조

### 결정: 하이브리드 (탭 + 바텀시트)

PM 3스텝 위자드 + Frontend 1 탭 구조 + Frontend 2 바텀시트를 결합:

**새 모임 생성**: 2스텝 위자드
1. 모임 이름 입력 → 2. 참가자 추가 → 완료

**모임 상세** (`/template/[id]`): 탭 UI
- 탭 1: "결제 내역" (참가자 바 + 결제 카드 리스트)
- 탭 2: "정산 결과" (요약 + 송금 내역)

**결제 추가/수정**: 바텀시트 (모바일) / Dialog (데스크탑)

### 라우팅
```
/                        → 랜딩 (비로그인)
/dashboard               → 모임 목록
/template/new            → 새 모임 위자드
/template/[id]           → 모임 상세 (탭)
/template/[id]?tab=settlement → 정산 결과 탭
/share/[token]           → 공유 결과 (읽기전용)
/login                   → 로그인 (v1.1)
```

---

## 5. 컴포넌트 패턴

### 참가자 선택: 칩 기반 토글
- 결제자 선택: single-select 칩 (드롭다운 대신)
- 참여자 선택: multi-select 토글 칩 + "모두 선택" 버튼
- 기본값: 전원 선택 (가장 흔한 케이스)

### 결제 리스트: 카드 기반 (테이블 대신)
- 기존 SPA의 Ant Design Table → 모바일 친화적 Card 리스트
- 각 카드: 사용처, 금액, 결제자, 참여 인원수
- 더보기 메뉴 (DropdownMenu): 수정, 삭제

### 정산 결과: 3계층 구조
1. **총액 요약 카드** (그라데이션 배경)
2. **송금 리스트** (From → To: 금액)
3. **개인별 상세** (Collapsible 접기/펼치기)

### 공유 페이지: "내 이름 찾기" 킬러 피처
- 이름 칩 탭 → 해당 카드 하이라이트 + 스크롤
- 나머지 40% opacity로 dim

---

## 6. 애니메이션

### 라이브러리: framer-motion (`motion`)
- 페이지 전환: fade + 8px 위로 슬라이드 (200ms)
- 리스트 아이템: AnimatePresence + layout
- 금액 카운팅: requestAnimationFrame easeOutCubic (600ms)
- 정산 완료: 체크마크 spring animation (confetti는 부적절)

### `prefers-reduced-motion` 존중
- 모든 애니메이션에 reduced-motion 체크

---

## 7. UX 정책 (PM 결정)

### 톤앤매너: 해요체
- "~해주세요", "~이에요" (금전 서비스 신뢰감 + 친밀감)
- 이모지 사용 안 함

### 금액 포맷: `10,000원`
- 통화 기호(₩) 대신 "원" 한글
- 소수점 없음 (정수 원 단위)
- 내림 처리 (`Math.floor`)

### 빈 상태: 상태 설명 + CTA 필수
- 모임 없음: "아직 모임이 없어요" + "+ 첫 모임 만들기"
- 결제 없음: "결제 내역을 추가하면 자동으로 정산돼요" + "+ 결제 추가"

### v1.0 결제 수정: 삭제 후 재생성으로 대체
- 수정 UI 복잡도 대비 빈도 낮음
- v1.1에서 인라인 수정 추가

---

## 8. 백엔드 즉시 조치 사항 (v1.1 전)

Backend가 발견한 현재 API 문제점:

| # | 이슈 | 심각도 | 조치 |
|---|------|--------|------|
| 1 | `middleware.ts` 없음 | P0 | 즉시 생성 |
| 2 | `template.delete` 소유권 검증 없음 | P0 | `userId` 조건 추가 |
| 3 | `payment.create/delete` 소유권 검증 없음 | P0 | template 소유권 검증 |
| 4 | CORS 와일드카드 `*` | P1 | 특정 origin으로 제한 |
| 5 | `participant` 라우터 없음 | P0 | CRUD 라우터 추가 |
| 6 | `sharedLink` 라우터 없음 | P0 | create/resolve/delete 추가 |
| 7 | `template.byId` 접근 제어 없음 | P1 | 소유권 또는 shared link 검증 |

---

## 9. 기술 스택 확정

| 항목 | 선택 | 비고 |
|------|------|------|
| UI 프레임워크 | shadcn/ui (apps/web 직접 설치) | packages/ui 공유 안 함 |
| 폼 관리 | React Hook Form + @hookform/resolvers/zod | @dutch/core validators 연결 |
| 애니메이션 | framer-motion (motion) | CSS transitions 병행 |
| 상태 관리 | React Query (tRPC) + URL params | Redux 없음 |
| 폰트 | Pretendard Variable (self-hosted) | ~300KB subset woff2 |
| 아이콘 | Lucide React | shadcn 기본 |
| 토스트 | Sonner (shadcn 내장) | |
| 바텀시트 | Drawer (Vaul 기반, shadcn) | 모바일 전용 |

---

## 관련 문서

- `docs/DESIGN_SPEC.md` — 디자인 시스템 + 페이지 와이어프레임
- `docs/TECHNICAL_SPEC.md` — 프론트엔드 기술 아키텍처
- `docs/AUTH_DESIGN.md` — Supabase Auth + RLS 설계
- `ARCHITECTURE.md` — 전체 프로젝트 아키텍처
- `BUSINESS_PLAN.md` — 비즈니스 전략
