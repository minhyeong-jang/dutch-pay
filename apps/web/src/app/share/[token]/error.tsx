"use client";

import Link from "next/link";

export default function ShareError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <p className="text-lg font-semibold text-foreground">
        정산 결과를 불러오지 못했어요
      </p>
      <p className="text-sm text-muted-foreground">
        네트워크를 확인하고 다시 시도해주세요
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={reset}
          className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="rounded-md border border-border px-6 py-2.5 text-sm font-medium text-foreground"
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}
