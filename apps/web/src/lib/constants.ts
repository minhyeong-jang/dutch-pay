/** 서비스 브랜딩 (서비스명 변경 시 여기만 수정) */
export const BRAND = {
  name: "나란",
  tagline: "복잡한 정산도 1분 만에",
  slogan: "돈 얘기, 나란이 대신할게",
  domain: "naran.im",
  url: "https://naran.im",
} as const;

/** 참가자 태그 색상 팔레트 (10색, 순환) */
export const TAG_COLORS = [
  "#0D9488", // Teal
  "#F97316", // Coral
  "#8B5CF6", // Violet
  "#F43F5E", // Rose
  "#0EA5E9", // Sky
  "#D97706", // Amber
  "#059669", // Emerald
  "#C026D3", // Fuchsia
  "#64748B", // Slate
  "#65A30D", // Lime
] as const;

/** 앱 설정 상수 */
export const APP_CONFIG = {
  maxParticipants: 20,
  maxPayments: 50,
  maxTemplateNameLength: 50,
  maxPaymentTitleLength: 100,
} as const;

/** 앱 스토어 링크 (null이면 Coming Soon) */
export const APP_STORE = {
  ios: null as string | null,
  android: null as string | null,
} as const;

/** localStorage 키 */
export const STORAGE_KEYS = {
  templates: "naran:templates",
} as const;
