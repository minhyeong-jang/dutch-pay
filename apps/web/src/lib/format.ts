/** 금액을 "10,000원" 형식으로 포맷 */
export function formatKRW(amount: number): string {
  return `${new Intl.NumberFormat("ko-KR").format(Math.floor(amount))}원`;
}

/** 숫자에 천 단위 콤마 (통화 기호 없이) */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("ko-KR").format(amount);
}

/** 상대 날짜 (오늘, 어제, 3일 전 등) */
export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return `${Math.floor(diffDays / 365)}년 전`;
}

/** 날짜를 "2026.02.23" 형식으로 포맷 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\. /g, ".").replace(/\.$/, "");
}
