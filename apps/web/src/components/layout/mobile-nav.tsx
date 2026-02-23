"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Plus, Settings } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "홈", icon: Home, primary: false },
  { href: "/dashboard/new", label: "새 모임", icon: Plus, primary: true },
  { href: "/settings", label: "설정", icon: Settings, primary: false },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-background lg:hidden">
      <div className="container mx-auto flex h-14 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          if (item.primary) {
            return (
              <Button
                key={item.href}
                asChild
                size="icon"
                className="size-10 rounded-full"
              >
                <Link href={item.href}>
                  <Icon className="size-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </Button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 text-xs touch-target",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
