# CalPayment Design System & UX Specification

> Comprehensive design document for CalPayment - the easiest bill-splitting experience in Korea.
> Created: 2026-02-23 | Role: UI/UX Designer

---

## Table of Contents

1. [Competitor UX Research](#1-competitor-ux-research)
2. [Design System Proposal](#2-design-system-proposal)
3. [Key Component Design Specs](#3-key-component-design-specs)
4. [Page-by-Page Wireframe Descriptions](#4-page-by-page-wireframe-descriptions)
5. [Micro-interactions & Delight](#5-micro-interactions--delight)

---

## 1. Competitor UX Research

### 1.1 Splitwise

**Core UX Flow:** 5-7 taps from launch to expense added (Open group > + Add expense > Enter description > Enter amount > Choose payer > Select split method > Save).

**What's Delightful:**
- Green/red color coding: green = money owed TO you, red = money YOU owe. Instantly understandable.
- Group-level debt simplification that minimizes total transfers.
- Multi-currency support for international travelers.

**What's Frustrating:**
- Adding unequal splits is extremely tedious -- requires calculating amounts manually and entering per-person.
- Date selector has terrible discoverability (tiny icon, no label).
- The UI feels dated and "child-like" -- does not inspire trust for financial matters.
- No way to settle multiple debts at once; one-by-one only.
- In large groups (8+ people), scrolling through participant lists is painful.
- Notifications are weak -- easy to miss payment reminders.

**Visual Style:** Teal/green primary on white. Rounded but slightly amateur-feeling cards. Heavy use of illustrations that feel casual rather than premium.

**Key Takeaway for CalPayment:** Splitwise proves that debt simplification is a beloved feature, but their UX for entering complex multi-person expenses is the exact pain point CalPayment must solve better.

---

### 1.2 Toss (토스)

**Core UX Flow:** 3-4 taps for simple 1/N split (소비내역 > 더치페이 > 친구 선택 > 요청). Toss only handles single-transaction splitting.

**What Makes Toss Feel So Smooth:**
- **Card-based information architecture**: Each piece of information lives in its own card, reducing cognitive load.
- **Toss Design System (TDS)**: Unified design language using OKLCH color space for perceptual uniformity and automatic dark mode.
- **Micro-copy mastery**: Every piece of text is conversational Korean, not formal/banking language. "얼마를 보낼까요?" instead of "송금액을 입력하세요."
- **Progressive disclosure**: Shows only what you need at each step. No overwhelming option dumps.
- **Spending analysis visualization**: Condensing complex financial data into simple, concise card images.
- **Speed**: Animations are 200-300ms. Nothing blocks the user. Perceived instant.

**What's Frustrating:**
- Only handles 1/N splits of a SINGLE payment. Cannot do multi-payment cross-settlement.
- Requires all participants to be Toss users with linked bank accounts.
- No concept of "groups" or "trips" -- purely transactional, one payment at a time.

**Visual Style:** "Toss Blue" (#0064FF) as brand color on near-white backgrounds. Extremely generous whitespace. Typography-driven -- minimal iconography. Dark mode is deeply integrated, not an afterthought.

**Key Takeaway for CalPayment:** Emulate Toss's conversational micro-copy and progressive disclosure. Beat them by handling what they cannot -- multi-payment cross-settlement. Never require participants to install anything.

---

### 1.3 KakaoPay (카카오페이 정산하기)

**Core UX Flow:** 4-5 taps (카카오톡 > 더보기 > 송금 > 정산하기 > 금액/친구 선택 > 요청). Leverages existing KakaoTalk contacts.

**What's Delightful:**
- Integrated into KakaoTalk, where Korean social interactions already happen.
- "미정산 알림" (unpaid reminder): Automatically re-sends notification to friends who haven't paid.
- "사다리 타기" (ladder game): Random bill splitting as a fun social feature.
- Photo attachment for receipts or group photos alongside the settlement.
- Handles 1-2 won rounding by absorbing the difference -- eliminates awkward decimal arguments.
- Up to 5 rounds per gathering (1차, 2차, 3차...).

**What's Frustrating:**
- Still fundamentally 1/N per round. Cannot handle "A paid for dinner, B paid for taxi, C paid for drinks" in one flow.
- Locked into KakaoPay ecosystem -- both sender and receiver need KakaoPay.
- No persistent group/template concept. Each settlement is a one-off.
- No cross-settlement optimization (if A owes B 10,000 and B owes A 5,000, it does not net them).

**Visual Style:** KakaoTalk yellow (#FEE500) accents within the chat-like interface. Familiar but constrained by the messenger context.

**Key Takeaway for CalPayment:** KakaoPay wins on distribution (it's already in KakaoTalk). CalPayment must make sharing TO KakaoTalk so seamless that the distribution gap disappears. The multi-round (1차/2차/3차) concept is table stakes -- CalPayment already supports this natively.

---

### 1.4 Settle Up / Tricount

**Core UX Flow:** Settle Up: 4-5 taps. Tricount: 3-4 taps (notably faster for adding an expense).

**What's Delightful:**
- **Tricount**: Excellent real-time sync -- all group members see updates instantly. Clean, streamlined design.
- **Settle Up**: Bubble-design showing individual balances is visually intuitive. Timeline view for settlement history. Minimizes number of transfers needed.
- Both support offline-first with sync.

**What's Frustrating:**
- **Settle Up**: Manual sync required (not automatic). Recent updates removed key features like exports and currency controls. Confusing redesign reported by users.
- **Tricount**: Recently acquired by bunq (European neobank) -- monetization pressure increasing. Some users report data loss after updates.
- Both feel "Western" -- not optimized for Korean financial conventions (won amounts, Korean names, KakaoTalk sharing).
- No Korean-language optimization or localization depth.

**Visual Style:** Tricount: Clean blues and whites, European fintech feel. Settle Up: More colorful with bubble-based person visualization.

**Key Takeaway for CalPayment:** These apps prove the market exists for persistent group expense tracking. Their weakness is Korean localization and KakaoTalk integration. CalPayment should take Tricount's speed and Settle Up's balance visualization, wrapped in a Korean-native experience.

---

### 1.5 Korean N-Way Calculators (엔팡, 개미는 뚠뚠, A형총무의 더치페이)

**Core UX Flow:** Typically 3-5 taps. Very simple, calculator-style.

**What's Delightful:**
- **엔팡**: Supports 1차/2차/3차 attendance-based calculation. Tracks payment history and per-person payment status.
- **개미는 뚠뚠**: Minimizes total transfer count (debt simplification). Simple, no-frills interface.
- **A형총무의 더치페이**: Travel-focused settlement. Good at handling the "총무" (treasurer) workflow.
- All are lightweight, fast to open, zero friction.

**What's Frustrating:**
- Most are ad-heavy (full-screen interstitials between every action).
- No data persistence -- close the app, lose everything.
- No sharing mechanism beyond copy-paste text.
- Visually dated. Most feel like 2017-era Android apps.
- No web version -- mobile app only.
- No accounts, no sync, no collaboration.

**Visual Style:** Varied, generally basic Material Design. Heavy ad placements that destroy the experience.

**Key Takeaway for CalPayment:** These apps prove Korean users actively search for "더치페이 계산기." CalPayment must rank for this keyword (SEO), offer the same zero-friction start (no login required), but with modern UI and data persistence that these apps lack.

---

### Competitive Positioning Summary

| Feature | Toss/KakaoPay | Splitwise | Korean Calculators | **CalPayment** |
|---------|:---:|:---:|:---:|:---:|
| Multi-payment cross-settlement | No | Yes | Partial | **Yes** |
| No app install required | No | No | No | **Yes (Web)** |
| No login required to start | No | No | Yes | **Yes** |
| Korean-native experience | Yes | No | Yes | **Yes** |
| KakaoTalk sharing | Yes (native) | No | No | **Yes (link)** |
| Persistent groups | No | Yes | No | **Yes** |
| Debt simplification | No | Yes | Some | **Yes** |
| Modern, premium UI | Yes (Toss) | No | No | **Yes** |
| Real-time collaboration | No | Yes | No | **Yes (P1)** |

---

## 2. Design System Proposal

### 2.1 Visual Mood & Philosophy

**Mood: "Warm Clarity"**

CalPayment should feel like a thoughtful friend who's great with money -- not a bank, not a toy. The design bridges the gap between Toss's cold professionalism and Korean calculators' casualness.

**Three reference apps that capture the right mood:**
1. **Toss** -- for information hierarchy and typography-first design
2. **Karrot (당근마켓)** -- for warm color palette and community-oriented feeling
3. **Linear** -- for interaction polish and developer-grade precision

**Design Principles:**
1. **One thing at a time.** Each screen has ONE primary action. Progressive disclosure, always.
2. **Numbers are the hero.** In a payment app, amounts must be the most visually prominent element on every screen.
3. **Zero-patience design.** If a user can tap instead of type, they should tap. If something can auto-fill, it should.
4. **Korean-first copy.** All UI text in natural, conversational Korean. Never formal/banking tone.

---

### 2.2 Color Palette

The current theme.css uses a pink/magenta primary (oklch hue ~350). This is being replaced with a carefully chosen palette that communicates trust + warmth + clarity.

**Decision: Primary color is Deep Teal (#0D9488)**

Rationale: Blue signals "finance/trust" but every Korean fintech uses blue (Toss, KakaoPay, Shinhan...). Green signals "money/settlement complete." Teal sits perfectly between -- communicating financial trustworthiness while remaining distinctive. It's warm enough to not feel clinical, professional enough to handle money.

#### Light Mode

| Token | Hex | OKLCH | Usage |
|-------|-----|-------|-------|
| `--primary` | `#0D9488` | `oklch(0.5955 0.1175 180.72)` | Primary buttons, active states, brand identity |
| `--primary-foreground` | `#FFFFFF` | `oklch(1 0 0)` | Text on primary |
| `--secondary` | `#F0FDFA` | `oklch(0.9826 0.0147 173.38)` | Secondary buttons, subtle highlights |
| `--secondary-foreground` | `#134E4A` | `oklch(0.3478 0.0651 178.72)` | Text on secondary |
| `--background` | `#FAFAFA` | `oklch(0.9823 0 0)` | Page background |
| `--card` | `#FFFFFF` | `oklch(1 0 0)` | Card surfaces |
| `--card-foreground` | `#171717` | `oklch(0.1992 0 0)` | Primary text on cards |
| `--foreground` | `#171717` | `oklch(0.1992 0 0)` | Primary body text |
| `--muted` | `#F5F5F5` | `oklch(0.9703 0 0)` | Muted backgrounds, disabled states |
| `--muted-foreground` | `#737373` | `oklch(0.5554 0 0)` | Secondary text, captions |
| `--accent` | `#F59E0B` | `oklch(0.7836 0.1647 74.93)` | Highlights, CTAs needing attention, warnings |
| `--accent-foreground` | `#451A03` | `oklch(0.2629 0.0579 51.81)` | Text on accent |
| `--success` | `#10B981` | `oklch(0.6956 0.1706 163.22)` | "정산 완료", positive balances |
| `--success-foreground` | `#FFFFFF` | `oklch(1 0 0)` | Text on success |
| `--destructive` | `#EF4444` | `oklch(0.6277 0.2272 27.33)` | Errors, delete actions, "보내야 할 돈" |
| `--destructive-foreground` | `#FFFFFF` | `oklch(1 0 0)` | Text on destructive |
| `--warning` | `#F59E0B` | `oklch(0.7836 0.1647 74.93)` | Pending states, incomplete items |
| `--warning-foreground` | `#451A03` | `oklch(0.2629 0.0579 51.81)` | Text on warning |
| `--border` | `#E5E5E5` | `oklch(0.9222 0 0)` | Borders, dividers |
| `--input` | `#FFFFFF` | `oklch(1 0 0)` | Input field backgrounds |
| `--ring` | `#0D9488` | `oklch(0.5955 0.1175 180.72)` | Focus rings |

**Semantic color assignments for settlement:**
- "받을 돈" (money to receive): `--success` (#10B981, green)
- "보낼 돈" (money to send): `--destructive` (#EF4444, red)
- "정산 완료" (settled): `--muted` with strikethrough or check icon
- "정산 대기" (pending): `--warning` (#F59E0B, amber)

#### Dark Mode

| Token | Hex | OKLCH |
|-------|-----|-------|
| `--primary` | `#2DD4BF` | `oklch(0.7953 0.1467 178.72)` |
| `--primary-foreground` | `#042F2E` | `oklch(0.2155 0.0456 178.72)` |
| `--background` | `#0A0A0A` | `oklch(0.1336 0 0)` |
| `--card` | `#171717` | `oklch(0.1992 0 0)` |
| `--card-foreground` | `#FAFAFA` | `oklch(0.9823 0 0)` |
| `--foreground` | `#FAFAFA` | `oklch(0.9823 0 0)` |
| `--muted` | `#262626` | `oklch(0.2434 0 0)` |
| `--muted-foreground` | `#A3A3A3` | `oklch(0.7163 0 0)` |
| `--success` | `#34D399` | `oklch(0.7748 0.1524 163.22)` |
| `--destructive` | `#F87171` | `oklch(0.7026 0.1858 27.33)` |
| `--border` | `#262626` | `oklch(0.2434 0 0)` |

**Dark mode strategy: Day 1.** shadcn/ui + Tailwind CSS variables make this trivial. The `@variant dark` block in theme.css already has the structure. Ship with system-preference detection and a manual toggle. Korean users under 35 heavily prefer dark mode at night, and bill-splitting often happens after evening gatherings.

---

### 2.3 Typography

**Decision: Pretendard** (with system font fallback stack)

Rationale:
- Most widely used Korean web font, selected as the Korean government's official web UI typeface (Pretendard GOV).
- Based on Inter (Latin) + Source Han Sans (CJK), so Latin and Korean characters harmonize perfectly.
- 9 weights available. Variable font support for performance.
- Free for commercial use. CDN delivery via cdnfonts or self-hosted via fontsource.
- Wanted Sans is geometrical and friendlier, but Pretendard's Neo-grotesque style better communicates financial reliability while remaining approachable.

**Font Stack:**
```css
--font-sans: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont,
  system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
  'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
  'Segoe UI Symbol', sans-serif;
```

**Type Scale (based on 16px root):**

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `display` | 36px / 2.25rem | 800 (ExtraBold) | 1.2 | Landing page hero only |
| `h1` | 28px / 1.75rem | 700 (Bold) | 1.3 | Page titles |
| `h2` | 22px / 1.375rem | 700 (Bold) | 1.35 | Section headings |
| `h3` | 18px / 1.125rem | 600 (SemiBold) | 1.4 | Card titles, modal titles |
| `body-lg` | 16px / 1rem | 400 (Regular) | 1.6 | Primary body text |
| `body` | 15px / 0.9375rem | 400 (Regular) | 1.6 | Default body text (mobile) |
| `body-sm` | 14px / 0.875rem | 400 (Regular) | 1.5 | Secondary text, descriptions |
| `caption` | 12px / 0.75rem | 500 (Medium) | 1.4 | Labels, timestamps, helper text |
| `amount-hero` | 32px / 2rem | 700 (Bold) | 1.2 | Main amounts displayed prominently |
| `amount-list` | 18px / 1.125rem | 600 (SemiBold) | 1.3 | Amounts in lists |
| `amount-sm` | 14px / 0.875rem | 600 (SemiBold) | 1.3 | Small amounts, secondary figures |

**Weight Usage Convention:**
- 400 (Regular): Body text, descriptions
- 500 (Medium): Labels, captions, emphasis
- 600 (SemiBold): Amounts, sub-headings, interactive elements
- 700 (Bold): Headings, hero amounts, primary CTAs
- 800 (ExtraBold): Display text only (landing page)

**Korean-specific considerations:**
- `letter-spacing: -0.01em` for Korean text at body size (Korean characters are wider than Latin).
- `word-break: keep-all` globally to prevent mid-word breaks in Korean.
- Amounts always use `font-variant-numeric: tabular-nums` for aligned columns.

---

### 2.4 Spacing & Layout

**Base spacing unit: 4px (0.25rem)**

This is already configured as `--spacing: 0.25rem` in the existing theme.css. All spacing values are multiples of 4.

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight gaps (icon-to-text) |
| `space-2` | 8px | Inside compact elements (tag padding) |
| `space-3` | 12px | Standard inline spacing |
| `space-4` | 16px | Standard padding, gap between related items |
| `space-5` | 20px | Card internal padding (mobile) |
| `space-6` | 24px | Card internal padding (desktop), section gaps |
| `space-8` | 32px | Between sections |
| `space-10` | 40px | Major section separation |
| `space-12` | 48px | Page-level vertical rhythm |
| `space-16` | 64px | Hero sections |

**Grid System:**
- Mobile: Single column, full-width cards with 16px horizontal page padding.
- Tablet (768px+): 2-column grid for dashboard cards, max-width 640px for form pages.
- Desktop (1024px+): 2-3 column layout, max-width 1200px centered. Settlement detail page uses 2-column (payments left, summary right).

**Border Radius:**
| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 8px | Small chips, tags, badges |
| `--radius-md` | 10px | Buttons, inputs |
| `--radius-lg` | 12px | Cards |
| `--radius-xl` | 16px | Modals, bottom sheets |
| `--radius-full` | 9999px | Avatars, pill buttons |

**Mobile Safe Areas:**
- Top: Use `env(safe-area-inset-top)` for notch devices.
- Bottom: 80px reserved for sticky action button + `env(safe-area-inset-bottom)`. This is critical -- the primary CTA must NEVER be hidden behind the home indicator on iPhones.
- Bottom nav (future mobile app): 56px height + safe area inset.

---

### 2.5 Shadows & Elevation

| Level | Token | Usage |
|-------|-------|-------|
| 0 | none | Flat elements within cards |
| 1 | `--shadow-sm` | Cards at rest |
| 2 | `--shadow-md` | Cards on hover/active, dropdowns |
| 3 | `--shadow-lg` | Bottom sheets, modals |
| 4 | `--shadow-xl` | Floating action buttons |

Shadows use `hsl(0 0% 0% / 0.05)` in light mode (very subtle) and `hsl(0 0% 0% / 0.2)` in dark mode. The existing theme.css values are appropriate.

---

### 2.6 Participant Tag Colors

Each participant gets an auto-assigned tag color for visual identification across the app. These are the 10 preset colors (cycle if >10 participants):

| Index | Name | Hex | Usage Context |
|-------|------|-----|---------------|
| 0 | Teal | `#0D9488` | (matches primary) |
| 1 | Coral | `#F97316` | Warm orange |
| 2 | Violet | `#8B5CF6` | Purple |
| 3 | Rose | `#F43F5E` | Pink-red |
| 4 | Sky | `#0EA5E9` | Light blue |
| 5 | Amber | `#D97706` | Deep yellow |
| 6 | Emerald | `#059669` | Deep green |
| 7 | Fuchsia | `#C026D3` | Magenta |
| 8 | Slate | `#64748B` | Neutral |
| 9 | Lime | `#65A30D` | Yellow-green |

These colors are chosen to be:
- Distinguishable from each other (including for colorblind users when combined with the name label)
- Sufficient contrast against white card backgrounds (all pass WCAG AA for large text)
- Vibrant enough to serve as visual anchors in settlement flow diagrams

---

## 3. Key Component Design Specs

### 3.1 Amount Input Component (금액 입력 컴포넌트)

**Design Decision: Custom numpad with quick-amount buttons.**

Rationale: Korean Won has no decimals, and amounts are typically in multiples of 1,000 or 10,000. A standard text keyboard wastes screen space on unnecessary keys (letters, decimals, symbols). A custom numpad lets us add quick-amount shortcuts.

**Layout (bottom-up):**
```
┌─────────────────────────────────┐
│  사용처  [점심 식사             ] │  <- Title input (standard keyboard)
├─────────────────────────────────┤
│         ₩ 54,000                │  <- Hero amount display (amount-hero, 32px)
│                                 │
│  [+1만] [+5천] [+1천] [직접입력] │  <- Quick amount buttons
├─────────────────────────────────┤
│   [ 1 ]   [ 2 ]   [ 3 ]       │
│   [ 4 ]   [ 5 ]   [ 6 ]       │  <- Custom numpad
│   [ 7 ]   [ 8 ]   [ 9 ]       │
│   [ 00]   [ 0 ]   [ ⌫ ]       │  <- 00 key for Won amounts
└─────────────────────────────────┘
```

**Key behaviors:**
- Amount formats in real-time with comma separators: typing `54000` displays `54,000`.
- `00` button (unique to Won input) -- tap once to add two zeros. Common pattern: `5` + `00` + `00` = `50,000원`.
- Quick amount buttons: `+1만`, `+5천`, `+1천` are ADDITIVE. Tapping `+1만` twice = 20,000원. This is faster than typing for common amounts.
- `직접입력` switches to the numpad for exact amounts.
- "원" suffix shown as muted text after the number.
- Maximum amount: 99,999,999원 (8 digits). Exceeding shows subtle shake animation.
- Empty state shows placeholder: `금액을 입력하세요` in muted-foreground color.
- The display area taps to focus/defocus the numpad (numpad slides up with spring animation, 300ms).

**Haptic feedback:** Light tap on each numpad press (mobile). On web, visual press state (scale 0.95 for 100ms).

---

### 3.2 Participant Selection/Management UI (참가자 선택/관리)

**Adding Participants:**

```
┌─────────────────────────────────┐
│  참가자 추가                     │
│  ┌────────────────────┬───────┐ │
│  │  이름 입력           │ 추가  │ │
│  └────────────────────┴───────┘ │
│                                 │
│  [🟢 민수] [🟠 지영] [🟣 현우]   │  <- Added tags
│  [🔴 수진] [⨉ 새참가자]         │  <- Tags with X to remove
│                                 │
│  최근 참가자:                    │
│  [+ 민수] [+ 지영] [+ 현우]     │  <- Quick-add from history
└─────────────────────────────────┘
```

**Key behaviors:**
- Name-only input. No phone number, no email. This is critical for zero-friction -- CalPayment's users often split bills with people they barely know (회식, MT).
- Enter/Return key OR "추가" button adds the participant.
- After adding, input auto-clears and stays focused for rapid sequential entry.
- Color auto-assigned from the 10-color palette in order. No user choice needed (reduces decisions).
- Tag shows colored circle + name. Tap tag to edit name; long-press/secondary click to delete.
- "최근 참가자" section: If logged in, shows names from previous sessions. Tap to add instantly. This is the "delight" feature -- remembering frequent co-diners.
- Minimum 2 participants to proceed. If user tries to continue with 1, show inline message: "최소 2명이 필요해요."

**For Payment Participant Selection (multi-select within a payment):**

```
┌─────────────────────────────────┐
│  참여자 선택                     │
│  [✓ 전체 선택]                   │  <- Toggle all
│                                 │
│  [✓ 🟢 민수]  [✓ 🟠 지영]       │
│  [  🟣 현우]  [✓ 🔴 수진]       │  <- Chip-style toggles
└─────────────────────────────────┘
```

- "전체 선택" is checked by default for new payments (most common case: everyone participated).
- Each participant is a tap-toggle chip. Selected = filled color background. Deselected = outline only.
- Tapping "전체 선택" when some are selected = selects all. When all selected = deselects all.
- Participant chips are arranged in a flowing grid (flex-wrap), 2 per row minimum.

---

### 3.3 Settlement Result Visualization (정산 결과 시각화)

This is the MOST IMPORTANT screen in the entire app. It's what gets shared, what creates the "aha moment," and what drives viral adoption.

**Summary Card (top of page):**
```
┌─────────────────────────────────┐
│  총 사용 금액                    │
│  ₩ 247,500                      │  <- amount-hero, bold
│  4명 · 결제 6건                  │  <- caption, muted
├─────────────────────────────────┤
│  [카카오톡 공유] [링크 복사]      │  <- Primary CTAs
└─────────────────────────────────┘
```

**Per-person Breakdown Cards:**
```
┌─────────────────────────────────┐
│  🟢 민수                        │
│  결제: ₩120,000  │  정산: -₩15,000│
│  ─────────────────────────────  │
│  → 지영에게 ₩15,000 보내기       │  <- Red text (보낼 돈)
│                    [토스로 송금]  │  <- Deeplink button (P2)
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  🟠 지영                        │
│  결제: ₩80,000   │  정산: +₩23,500│
│  ─────────────────────────────  │
│  ← 민수에게서 ₩15,000 받기       │  <- Green text (받을 돈)
│  ← 현우에게서 ₩8,500 받기        │  <- Green text
└─────────────────────────────────┘
```

**Key design decisions:**
- "보낼 돈" (send) uses `--destructive` (red) with `→` arrow prefix.
- "받을 돈" (receive) uses `--success` (green) with `←` arrow prefix.
- Directional arrows make the flow instantly readable without reading the text.
- Each person card shows their total payments and net settlement amount side by side.
- Cards are sorted by: people who need to send money first (action-required items on top).

**Two View Modes (tabs):**

1. **각자 정산** (Individual settlement): Each person sends directly to whoever they owe. Shows the full graph of who-owes-whom. Default view.

2. **일괄 정산** (Consolidated settlement via treasurer): One person (총무) collects from everyone and redistributes. Shows simplified "everyone sends to 총무" + "총무 sends to creditors."

Tab UI: Two pill-shaped tabs at the top of the results section. Default: 각자 정산.

---

### 3.4 Template/Gathering Card (모임 카드)

**Dashboard card layout:**
```
┌─────────────────────────────────┐
│  🏖️ 부산 여행                   │  <- h3, 18px bold
│  2026.02.15 · 4명               │  <- caption, muted
│  ─────────────────────────────  │
│  ₩ 487,200          [정산 완료 ✓]│  <- amount-list + status badge
│  ─────────────────────────────  │
│  🟢🟠🟣🔴                       │  <- Participant color dots (mini)
└─────────────────────────────────┘
```

**Key info shown at a glance (priority order):**
1. Gathering name (모임 이름)
2. Date + participant count
3. Total amount
4. Settlement status badge:
   - "진행중" -- `--warning` amber badge
   - "정산 완료" -- `--success` green badge with checkmark
   - "미정산" -- `--muted` gray badge (no settlement calculated yet)
5. Participant color dots (max 6 shown, then "+2" indicator)

**Card interactions:**
- Tap: Navigate to gathering detail.
- Long press (mobile) / Right-click (desktop): Context menu with "이름 변경", "삭제", "공유".
- Swipe left (mobile future): Reveal delete button (destructive red).

---

### 3.5 Payment List Item (결제 건 리스트 아이템)

```
┌─────────────────────────────────┐
│  🍽️ 점심 식사                    │  <- h3 weight
│  🟢 민수 결제 · 4명 참여          │  <- caption, muted
│                     ₩ 54,000    │  <- amount-list, right-aligned
│  🟢🟠🟣🔴                       │  <- participant dots
└─────────────────────────────────┘
```

**Key behaviors:**
- Payment title on the first line, amount right-aligned.
- Payer name with their color dot + participant count.
- Small participant color dots below showing who participated.
- Tap: Opens payment edit/detail sheet (bottom sheet on mobile, modal on desktop).
- Swipe left (mobile): Delete button slides in. Requires confirmation dialog: "이 결제 내역을 삭제할까요?"
- No long-press actions -- swipe is more discoverable and standard in Korean apps.

**Empty state (no payments yet):**
```
┌─────────────────────────────────┐
│                                 │
│       📝                        │
│  아직 결제 내역이 없어요          │
│  첫 번째 결제를 추가해보세요       │
│                                 │
│      [+ 결제 추가하기]            │
│                                 │
└─────────────────────────────────┘
```

---

### 3.6 Share Card / Link Preview (공유 카드)

**KakaoTalk share preview (og:image):**
```
┌─────────────────────────────────┐
│  CalPayment                     │
│  ─────────────────────────────  │
│  🏖️ 부산 여행 정산 결과          │
│  총 ₩487,200 · 4명              │
│  ─────────────────────────────  │
│  내 정산 금액을 확인하세요 →      │
└─────────────────────────────────┘
```

**Technical spec for og:image:**
- Size: 800x400px (KakaoTalk optimal)
- Background: White (#FFFFFF)
- Primary text: `--foreground` (#171717)
- Brand accent: `--primary` (#0D9488) top bar or logo
- Generated dynamically per gathering (Next.js OG Image generation via `ImageResponse`)

**Link preview meta tags:**
```
og:title: "부산 여행 정산 결과"
og:description: "총 487,200원 · 4명 | 내 정산 금액 확인하기"
og:image: [dynamically generated image]
og:url: https://calpayment.kr/s/{shareToken}
```

**Share page (recipient view):**
When someone opens the shared link, they see:
1. The full settlement result (read-only).
2. A prominent "내 이름 찾기" search/filter at the top.
3. Tapping their name highlights their card and scrolls to it with a subtle glow animation.
4. Bottom CTA: "나도 CalPayment로 정산하기" -- leads to app/landing.
5. No login wall. No signup prompt blocking content. Pure value first.

---

## 4. Page-by-Page Wireframe Descriptions

### 4.1 Landing Page (랜딩 페이지)

**Purpose:** Convert visitors into first-time users. Zero friction.

**Header Area:**
- Fixed top bar, 56px height.
- Left: CalPayment logo (teal wordmark, no icon -- typography-based brand).
- Right: "로그인" text button (muted-foreground color, not prominent -- login is optional).
- Background: transparent, blurs to solid white after 50px scroll.

**Hero Section:**
```
[                                  ]
[     토스로 못 하는               ]  <- display size, 36px
[     복잡한 정산,                 ]
[     1분 만에.                    ]  <- Primary color (teal)
[                                  ]
[  여러 명이 각각 결제한 복수 건을    ]  <- body-lg, muted-foreground
[  한 번에 교차 정산합니다.          ]
[                                  ]
[     [ 바로 시작하기 →           ] ]  <- Primary button, full-width on mobile
[                                  ]
[   로그인 없이 바로 사용 가능        ]  <- caption, muted, below button
[                                  ]
```

**Feature Cards Section (below fold):**
3 horizontal-scroll cards on mobile, 3-column grid on desktop:
1. "복수 결제 교차 정산" -- Icon: overlapping arrows. "1차, 2차, 3차 모두 한 번에"
2. "카카오톡 바로 공유" -- Icon: share arrow. "결과 링크를 카톡으로 바로 전달"
3. "앱 설치 없이 사용" -- Icon: globe. "웹브라우저에서 바로 시작"

**Social Proof Section:**
"00명이 정산을 완료했습니다" counter (once analytics exist).

**Bottom CTA:**
Repeat "바로 시작하기" button.

**Footer:**
이용약관 | 개인정보처리방침 | 문의하기 -- caption size, muted.

**Animations:**
- Hero text fades in with 20px upward slide, staggered 100ms per line.
- Feature cards fade in on scroll intersection.
- CTA button has subtle pulse animation (scale 1.0 to 1.02, 2s loop) until first interaction.

---

### 4.2 Dashboard (모임 목록)

**Purpose:** Overview of all gatherings. Quick access to create new or continue existing.

**Header Area:**
- Left: "내 모임" (h1, 28px bold).
- Right: User avatar circle (if logged in) or "로그인" text link.
- Below header: Subtle search bar (tap to expand) -- "모임 검색" placeholder.

**Main Content:**
```
┌─ Pinned / Active ──────────────┐
│  [Card: 부산 여행 · 진행중]      │  <- Most recent active gathering
└─────────────────────────────────┘

┌─ 전체 모임 ────────────────────┐
│  [Card: 팀 회식]                │
│  [Card: 대학 동기 모임]          │
│  [Card: ...more...]             │
└─────────────────────────────────┘
```

- Active/in-progress gatherings pinned at top with subtle amber left border.
- Completed gatherings below, sorted by date descending.
- Cards use the Template Card component (3.4).
- Pull-to-refresh on mobile.
- Empty state: Illustration of friends + "첫 모임을 만들어보세요" + CTA button.

**Action Button:**
- Floating Action Button (FAB) at bottom-right, 56px circle, `--primary` background.
- Icon: "+" in white.
- Position: 24px from right edge, 24px from bottom safe area.
- Shadow: `--shadow-xl`.
- Tap: Navigate to "새 모임 만들기."
- On scroll down: FAB shrinks slightly and becomes semi-transparent. On scroll up: returns to full visibility.

**Bottom Area:**
- No bottom navigation on web (single-purpose app).
- On future mobile app: Bottom tab bar with "모임" (active), "알림" (P1), "마이페이지."

**Transitions:**
- Cards enter with staggered fade-in (50ms delay between each).
- Tapping a card: Card scales to 0.98 on press, then expands to fill the screen (shared element transition to detail page).

---

### 4.3 New Gathering (새 모임 만들기)

**Design Decision: Wizard (step-by-step), NOT single page.**

Rationale: Progressive disclosure. Each step has one decision. This mirrors Toss's approach and reduces the overwhelming feeling of a long form. 3 steps total.

**Step Indicator:**
```
  ● ─── ○ ─── ○
 모임    참가자   완료
```
Horizontal step indicator at top, below header. Active step = `--primary` filled circle. Completed = `--primary` filled. Future = `--border` outline.

**Step 1: 모임 정보**
```
┌─────────────────────────────────┐
│  ← 뒤로                         │  <- Header with back button
│                                 │
│  어떤 모임인가요?                 │  <- h1, 28px
│                                 │
│  모임 이름                       │  <- label, caption size
│  ┌─────────────────────────────┐│
│  │  (e.g. 부산 여행)            ││  <- Large input, h3 size text
│  └─────────────────────────────┘│
│                                 │
│  빠른 선택:                      │
│  [회식] [여행] [MT] [생일] [기타] │  <- Suggestion chips
│                                 │
│  ─────────────────────────────  │
│                                 │
│          [ 다음 →             ]  │  <- Primary button, sticky bottom
│                                 │
└─────────────────────────────────┘
```

- Suggestion chips auto-fill the name input (e.g., tapping "회식" fills "회식", tapping "여행" fills "여행").
- User can edit after chip selection.
- Input auto-focused on page load. Keyboard opens immediately.
- "다음" button disabled until name is non-empty.

**Step 2: 참가자 추가**
```
┌─────────────────────────────────┐
│  ← 뒤로              ● ● ─ ○   │
│                                 │
│  누가 참여하나요?                 │  <- h1
│                                 │
│  [Participant input component]   │  <- See 3.2
│                                 │
│  Tip: 나중에 추가할 수도 있어요   │  <- caption, muted
│                                 │
│          [ 다음 →             ]  │  <- Enabled when 2+ participants
└─────────────────────────────────┘
```

**Step 3: Complete**
```
┌─────────────────────────────────┐
│                                 │
│         ✓                       │  <- Animated checkmark (teal)
│                                 │
│   부산 여행                      │  <- h2
│   4명 참여                       │  <- body, muted
│                                 │
│  이제 결제 내역을 추가해보세요     │  <- body
│                                 │
│  [ 결제 추가하기 →            ]  │  <- Primary button
│  [ 대시보드로 돌아가기         ]  │  <- Secondary/ghost button
│                                 │
└─────────────────────────────────┘
```

- Checkmark animates with a drawing-path SVG animation (like Toss's completion screen).
- Confetti is NOT used -- too playful for financial context. The animated check is sufficient.

**Transitions:**
- Steps slide left-to-right (forward) and right-to-left (back) with 250ms ease-out.
- Step indicator animates fill progress.

---

### 4.4 Gathering Detail (모임 상세)

**Purpose:** The main workspace. Participants, payments, and settlement results all accessible from here.

**Header Area:**
```
┌─────────────────────────────────┐
│  ← 뒤로     부산 여행     [⋯]   │  <- Title centered, menu right
└─────────────────────────────────┘
```
- "⋯" menu: 이름 변경, 참가자 편집, 공유, 삭제.
- Header is sticky, collapses on scroll (title moves to center of compact header).

**Participant Bar (horizontal scroll):**
```
│  [🟢민수] [🟠지영] [🟣현우] [🔴수진] [+ 추가]  │
```
- Horizontal scrolling row of participant chips.
- "+" chip at end to add more participants.
- Tapping a chip shows a bottom sheet with that person's payment summary.

**Tab Section:**
```
  [ 결제 내역 ]  [ 정산 결과 ]
```
Two tabs. Default: "결제 내역."

**Tab 1 - 결제 내역:**
- List of Payment List Items (3.5).
- Sorted by creation order (most recent at top).
- Sticky bottom: "+ 결제 추가" full-width button (`--primary`).

**Tab 2 - 정산 결과:**
- Settlement Result visualization (3.3).
- Summary card at top.
- Per-person cards below.
- Sticky bottom: "공유하기" full-width button (`--primary`).
- If no payments exist: "결제 내역을 먼저 추가해주세요" message with arrow pointing to tab 1.

**Transitions:**
- Tab switching: Content crossfades (150ms). No horizontal slide (tabs are not swipeable -- too easy to accidentally switch).
- Adding a new payment: Bottom sheet slides up (300ms spring).

---

### 4.5 Add/Edit Payment (결제 추가/수정)

**Design Decision: Bottom sheet (mobile), Modal dialog (desktop).**

Rationale: Bottom sheets feel native on mobile and allow the underlying page to remain visible as context. On desktop, a centered modal is more appropriate.

**Layout:**
```
┌─────────────────────────────────┐
│  ── drag handle ──              │  <- 4px wide, 40px, centered, rounded
│                                 │
│  결제 추가                │ ✕   │  <- h2 + close button
│                                 │
│  사용처                          │
│  ┌─────────────────────────────┐│
│  │  (e.g. 점심 식사)            ││
│  └─────────────────────────────┘│
│                                 │
│  금액                            │
│  [Amount Input Component - 3.1] │
│                                 │
│  결제자                          │
│  [🟢민수] [🟠지영] [🟣현우] [🔴수진]│  <- Single-select chips
│                                 │
│  참여자                          │
│  [Participant selector - 3.2]    │
│                                 │
│  ─────────────────────────────  │
│  [ 추가하기                   ]  │  <- Primary button
│  ─────────────────────────────  │
│  env(safe-area-inset-bottom)     │
└─────────────────────────────────┘
```

**Key behaviors:**
- Drag handle at top for dismissal gesture (swipe down to close).
- Fields are ordered by likely input sequence: What > How much > Who paid > Who participated.
- "결제자" is single-select (radio-style chips). Tapping one deselects others.
- "참여자" defaults to all selected (전체 선택 on).
- "추가하기" button validates: title non-empty, amount > 0, payer selected, at least 1 participant. Disabled until valid.
- On edit mode: Title changes to "결제 수정", button says "수정하기", and a "삭제" text button (destructive red) appears at the bottom.

**Transitions:**
- Bottom sheet slides up with spring physics (slight overshoot then settle).
- On close: Slides down and fades out (200ms).
- Success: Sheet closes, new payment card appears in the list with a brief scale-in animation (0.95 to 1.0).

---

### 4.6 Settlement Result Detail (정산 결과 상세)

This is the full-page version of the settlement view, primarily accessed via the share link or "정산 결과" tab.

**Header:**
```
┌─────────────────────────────────┐
│  ← 뒤로     정산 결과           │
└─────────────────────────────────┘
```

**Main Content:**
```
┌─ Summary Card ─────────────────┐
│  부산 여행                      │
│  ₩ 487,200                     │  <- amount-hero
│  4명 · 6건 결제                  │
│  2026.02.15                    │
└─────────────────────────────────┘

┌─ View Mode Toggle ─────────────┐
│  [● 각자 정산] [○ 일괄 정산]     │
└─────────────────────────────────┘

┌─ Per-person cards ─────────────┐
│  [Settlement cards from 3.3]    │
│  ... sorted by "needs to act"   │
└─────────────────────────────────┘

┌─ Payment Breakdown (collapsed) ┐
│  ▶ 결제 내역 상세 보기            │  <- Expandable accordion
│    점심 식사 ₩54,000 (민수 결제)  │
│    카페 ₩12,000 (지영 결제)      │
│    ...                          │
└─────────────────────────────────┘
```

**Sticky Bottom:**
```
┌─────────────────────────────────┐
│  [카카오톡 공유]  [텍스트 복사]    │  <- Two buttons side by side
│  [링크 복사    ]                 │  <- Full-width secondary below
└─────────────────────────────────┘
```

- "카카오톡 공유" = `--primary` button with KakaoTalk icon. Uses Kakao SDK share.
- "텍스트 복사" = Secondary outline button. Copies formatted text to clipboard:
  ```
  [부산 여행 정산 결과]
  총 487,200원 (4명)

  민수 → 지영: 15,000원
  현우 → 지영: 8,500원
  ...
  ```
- "링크 복사" = Ghost button. Copies share URL.

---

### 4.7 Share Page (공유 페이지 - Public)

**Purpose:** Read-only settlement result for non-users who receive the shared link. This is the VIRAL CONVERSION page.

**Header:**
```
┌─────────────────────────────────┐
│  CalPayment              [앱 열기]│  <- Brand + download CTA
└─────────────────────────────────┘
```
- "앱 열기" is a subtle text button, not pushy. Opens the app if installed, otherwise goes to landing page.

**Name Finder:**
```
┌─────────────────────────────────┐
│  🔍 내 이름 찾기                 │  <- Prominent search/filter
│  [민수] [지영] [현우] [수진]      │  <- Tappable name chips
└─────────────────────────────────┘
```
- Tapping a name: All other cards dim to 40% opacity. Selected person's card gets a teal left border glow and scrolls into view. Their specific send/receive items are highlighted.
- This is the KILLER FEATURE of the share page. The recipient taps their name and instantly sees exactly what they owe/are owed.

**Main Content:**
- Same settlement visualization as 4.6, but read-only.
- No edit buttons, no delete actions.

**Bottom Banner:**
```
┌─────────────────────────────────┐
│  나도 정산 쉽게 하고 싶다면       │
│  [ CalPayment 시작하기 →      ]  │  <- Conversion CTA
└─────────────────────────────────┘
```
- Appears after scrolling past the settlement results (not blocking content).
- Subtle, not a popup. Sticky at the bottom of the page.
- Background: `--secondary` (light teal tint).

**Transitions:**
- Page loads with settlement data pre-rendered (SSR via Next.js for instant display and SEO).
- Name highlight animation: 300ms ease-out opacity change + left-border scale animation.

---

### 4.8 Login / Sign Up (로그인/회원가입)

**Design Decision: Single page with social login only (Phase 1). No email/password.**

Rationale: The business plan specifies Kakao login first. Adding email/password creates unnecessary friction and security liability for an MVP. Social login only.

**Layout:**
```
┌─────────────────────────────────┐
│  ← 뒤로                         │
│                                 │
│                                 │
│  CalPayment                     │  <- Logo/wordmark, centered
│                                 │
│  로그인하면 정산 기록이           │  <- body, centered
│  영구 저장됩니다                  │
│                                 │
│                                 │
│  [ 🟡 카카오로 시작하기        ]  │  <- #FEE500 bg, #000 text
│                                 │
│  [ 🍎 Apple로 시작하기         ]  │  <- #000 bg, #FFF text
│                                 │
│  [ G  Google로 시작하기        ]  │  <- #FFF bg, #000 text, border
│                                 │
│                                 │
│                                 │
│  로그인 없이 계속 사용하기         │  <- Text link, muted, underline
│                                 │
│  ─────────────────────────────  │
│  로그인 시 이용약관 및             │  <- caption, muted
│  개인정보처리방침에 동의합니다      │
└─────────────────────────────────┘
```

**Key design decisions:**
- Kakao button uses official Kakao brand colors (#FEE500 yellow). This is the FIRST button, largest, because 93%+ of Korean smartphone users have KakaoTalk.
- Apple sign-in second (required for iOS App Store).
- Google third.
- "로그인 없이 계속 사용하기" is clearly visible but visually de-emphasized. Users who tap this continue with localStorage/anonymous mode.
- No separate "회원가입" page. First login auto-creates account. Korean users expect this pattern (from Toss, KakaoPay, etc.).

**When login is triggered (contextual prompt):**
Login is NOT shown at app launch. It appears when:
1. User tries to create a second gathering (first one stays in localStorage).
2. User tries to access history.
3. User explicitly taps "로그인" in header.

The prompt appears as a bottom sheet with the login options, not a full page redirect. Message: "로그인하면 모든 기기에서 정산 기록을 확인할 수 있어요."

---

## 5. Micro-interactions & Delight

### 5.1 Settlement Calculation Animation

**Trigger:** When switching to "정산 결과" tab or when settlement is first calculated.

**Animation sequence (700ms total):**
1. (0-200ms) Summary card fades in from below with total amount counting up from 0 to final number (animated counter).
2. (200-400ms) Connection lines draw between person cards -- thin teal lines with arrow endpoints animate from sender to receiver.
3. (400-700ms) Per-person cards stagger in from bottom, 80ms delay between each.

**User reaction target:** "오 결과가 바로 나오네, 깔끔하다."

### 5.2 Amount Input Haptic + Visual Feedback

**Trigger:** Each keypress on the custom numpad.

**Animation:**
- Numpad button: Scale 0.92 on press, spring back to 1.0 on release (100ms).
- Amount display: The newly typed digit appears with a subtle scale-up (1.0 to 1.05 to 1.0, 150ms) on the rightmost character.
- When amount reaches common milestones (10,000 / 50,000 / 100,000), a brief shimmer effect (gradient sweep) passes across the number.
- On mobile: `navigator.vibrate(10)` light haptic on each press.

**User reaction target:** "입력하는 느낌이 좋다, 착착 눌린다."

### 5.3 Participant Tag Pop-in

**Trigger:** Adding a new participant name.

**Animation:**
- New tag "pops" into the tag row with a spring scale animation (0 -> 1.1 -> 1.0, 250ms).
- The tag's colored circle fills in with a clockwise wipe (like a progress indicator hitting 100%).
- Other tags shift left smoothly (200ms ease-out) to make room.

**User reaction target:** "추가되는 게 확실히 보인다."

### 5.4 Share Success Celebration

**Trigger:** After tapping "카카오톡 공유" or "링크 복사" and the action succeeds.

**Animation:**
- The button briefly transforms: text changes to "복사됨!" / "공유됨!" with a checkmark icon replacing the share icon.
- Background color morphs from `--primary` to `--success` (300ms).
- After 2 seconds, it reverts to the original state.
- A toast notification slides in from the bottom: "링크가 복사되었어요" (persists 3 seconds, auto-dismiss).

**User reaction target:** "오 복사된 거 확실하네."

### 5.5 Pull-to-Refresh with Brand Animation

**Trigger:** Pull-to-refresh gesture on dashboard.

**Animation:**
- As the user pulls, the CalPayment "C" logomark rotates proportionally to pull distance.
- At threshold: The logo completes a full 360-degree spin with ease-out.
- During refresh: Three dots pulse in `--primary` color below the logo.
- On completion: Content pushes in from below, logo snaps back up.

**User reaction target:** "이거 꽤 신경 썼네."

---

### Loading States

**Skeleton screens everywhere, never spinners.**

- Dashboard: 3 skeleton cards with pulsing gradient animation (light gray shimmer).
- Gathering detail: Participant bar skeleton + 4 payment item skeletons.
- Settlement calculation: Skeleton summary card + 3 skeleton person cards.
- Skeleton shimmer: Linear gradient from `--muted` to `--background` to `--muted`, animating left-to-right, 1.5s loop.

**Error states:**

- Network error: Full-screen centered illustration + "연결이 불안정해요" + "다시 시도" button.
- Not found (share link expired): "이 정산 링크가 만료되었어요" + "새 정산 시작하기" CTA.
- Generic error: Toast at bottom, red background (`--destructive`), auto-dismiss 5 seconds with manual dismiss X.

---

### Page Transition Patterns

| Navigation | Transition |
|-----------|-----------|
| Dashboard -> Gathering Detail | Shared element: Card expands to fill screen (300ms spring) |
| Gathering Detail -> Back | Reverse: screen shrinks back to card position |
| Forward navigation (wizard steps) | Content slides left, new content enters from right (250ms ease-out) |
| Back navigation | Content slides right, new content enters from left (250ms ease-out) |
| Opening bottom sheet | Sheet slides up from bottom with spring overshoot (300ms) + backdrop fades in (200ms) |
| Closing bottom sheet | Sheet slides down (200ms ease-in) + backdrop fades out (200ms) |
| Tab switching | Content crossfade (150ms) |
| Toast notifications | Slide up from bottom edge (200ms ease-out), slide down to dismiss (150ms) |

**Global rules:**
- All animations respect `prefers-reduced-motion: reduce`. When reduced motion is preferred, replace all animations with instant state changes (opacity 0->1, no transforms).
- Maximum animation duration: 400ms for any single animation. Users should never feel "waiting for the animation."
- Use CSS `will-change` on animated elements for GPU acceleration. Remove after animation completes.

---

## Appendix: Implementation Notes

### shadcn/ui Component Mapping

| CalPayment Component | shadcn/ui Base | Customization |
|---------------------|---------------|---------------|
| Amount Input | Custom (no base) | Full custom component |
| Participant Tag | `Badge` | Custom colors, close button |
| Participant Selector | `ToggleGroup` | Chip variant with color dots |
| Payment Card | `Card` | Custom layout with swipe |
| Settlement Summary | `Card` | Custom with amount-hero typography |
| Settlement Person Card | `Card` | Color-coded left border |
| Template Card | `Card` | Status badge integration |
| Bottom Sheet | `Sheet` (side=bottom) | Drag handle, spring animation |
| Step Indicator | Custom (no base) | Connected dots with progress |
| Quick Amount Button | `Button` variant=outline | Pill shape |
| Numpad | Custom (no base) | Grid layout with haptics |
| Toast | `Sonner` (already in shadcn) | Custom styling |
| Tab Group | `Tabs` | Pill-style variant |
| Context Menu | `DropdownMenu` | Long-press trigger on mobile |

### CSS Variable Override Plan

The existing `/tooling/tailwind/theme.css` will be updated with the new color palette. Additional custom tokens to add:

```css
/* New semantic tokens */
--success: oklch(0.6956 0.1706 163.22);
--success-foreground: oklch(1 0 0);
--warning: oklch(0.7836 0.1647 74.93);
--warning-foreground: oklch(0.2629 0.0579 51.81);

/* Settlement-specific tokens */
--settlement-send: var(--destructive);
--settlement-receive: var(--success);
--settlement-pending: var(--warning);
--settlement-complete: var(--success);
```

### Font Loading Strategy

```tsx
// apps/web/src/app/layout.tsx
// Replace Geist with Pretendard
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.subset.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '100 900',
});
```

Use `next/font/local` with a subset WOFF2 file (~300KB for Korean subset) for optimal loading performance. Fallback to system fonts ensures no FOUT on slow connections.

---

*This design system document should be treated as a living specification. As implementation proceeds, specific values may be adjusted based on real-device testing and user feedback. The core principles -- warmth, clarity, zero-friction, and Korean-first -- must remain constant.*
