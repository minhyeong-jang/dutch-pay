"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BRAND } from "~/lib/constants";
import { cn } from "~/lib/utils";

export function AppHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 flex h-14 items-center transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled
          ? "border-b bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-background",
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="text-lg font-bold text-primary">
          {BRAND.name}
        </Link>
        <Link
          href="/dashboard"
          className={cn(
            "text-sm font-medium transition-colors hover:text-foreground",
            isDashboard ? "text-foreground" : "text-muted-foreground",
          )}
        >
          내 모임
        </Link>
      </div>
    </header>
  );
}
