"use client";

import Link from "next/link";

export function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center border-b bg-background">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-primary">
          CalPayment
        </Link>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          내 모임
        </Link>
      </div>
    </header>
  );
}
