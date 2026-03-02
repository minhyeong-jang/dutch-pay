"use client";

import Link from "next/link";

import { Button } from "~/components/ui/button";
import { AppStoreBadge } from "~/components/landing/app-store-badge";

export function FinalCta() {
  return (
    <section
      aria-label="시작하기"
      className="bg-gradient-to-br from-primary to-success py-16 sm:py-20 lg:py-30"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl lg:text-4xl">
          돈 얘기, 나란이 대신할게
        </h2>
        <p className="mt-4 text-primary-foreground/80">
          지금 바로 시작하세요. 로그인도, 비용도 필요 없어요.
        </p>

        <div className="mt-8">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/template/new">지금 바로 정산하기</Link>
          </Button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <AppStoreBadge platform="ios" variant="light" />
          <AppStoreBadge platform="android" variant="light" />
        </div>
      </div>
    </section>
  );
}
