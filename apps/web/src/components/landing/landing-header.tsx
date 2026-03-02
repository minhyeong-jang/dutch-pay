"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { BRAND } from "~/lib/constants";
import { cn } from "~/lib/utils";

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex h-14 items-center transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled
          ? "border-b bg-background/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-primary">
          {BRAND.name}
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/dashboard">로그인</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/template/new">시작하기</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
