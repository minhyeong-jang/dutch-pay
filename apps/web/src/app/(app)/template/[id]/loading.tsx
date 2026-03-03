export default function TemplateLoading() {
  return (
    <div className="flex flex-col gap-4 py-4">
      {/* 모임 이름 */}
      <div className="h-8 w-40 animate-pulse rounded bg-muted" />

      {/* 참가자 태그 */}
      <div className="flex gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-muted" />
        ))}
      </div>

      {/* 탭 바 */}
      <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />

      {/* 결제 카드 스켈레톤 */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}
