"use client";

import Link from "next/link";

import { Button } from "~/components/ui/button";
import { AppStoreBadge } from "~/components/landing/app-store-badge";

export function Hero() {
  return (
    <section
      aria-label="서비스 소개"
      className="bg-gradient-to-b from-[oklch(0.97_0.01_180)] to-background pt-24 pb-16 sm:pb-20 lg:pt-32 lg:pb-30 dark:from-[oklch(0.18_0.015_180)]"
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-12 text-center lg:flex-row lg:text-left">
          {/* Text content */}
          <div className="flex flex-1 flex-col items-center gap-6 lg:items-start">
            <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl lg:text-[56px] lg:leading-tight">
              복잡한 정산도
              <br />
              <span className="text-primary">1분 만에</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground sm:text-xl lg:text-2xl">
              여러 명이 각각 결제한 복수 건, 한 번에 정리해 드려요.
              <br className="hidden sm:block" />
              누가 누구에게 얼마를 보내면 되는지 바로 확인하세요.
            </p>

            <div className="flex flex-col items-center gap-3 lg:items-start">
              <Button
                size="lg"
                className="h-12 px-8 text-base font-semibold shadow-lg"
                asChild
              >
                <Link href="/template/new">지금 바로 정산하기</Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                로그인 없이 바로 사용 가능
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <AppStoreBadge platform="ios" />
              <AppStoreBadge platform="android" />
            </div>
          </div>

          {/* App mockup */}
          <div className="flex flex-1 justify-center lg:justify-end">
            <div className="relative h-[480px] w-[240px] rotate-3 overflow-hidden rounded-[40px] border-4 border-foreground/10 bg-gradient-to-br from-primary/20 via-success/20 to-accent/20 shadow-2xl sm:h-[560px] sm:w-[280px]">
              <div className="absolute inset-x-0 top-0 flex h-8 items-center justify-center">
                <div className="h-5 w-24 rounded-b-2xl bg-foreground/10" />
              </div>
              <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
                <div className="size-16 rounded-2xl bg-primary/30" />
                <div className="h-3 w-24 rounded-full bg-foreground/10" />
                <div className="h-2 w-32 rounded-full bg-foreground/5" />
                <div className="mt-4 w-full space-y-2">
                  <div className="h-10 w-full rounded-lg bg-foreground/5" />
                  <div className="h-10 w-full rounded-lg bg-foreground/5" />
                  <div className="h-10 w-full rounded-lg bg-foreground/5" />
                </div>
                <div className="mt-4 h-10 w-full rounded-lg bg-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
