"use client";

import { toast } from "sonner";

import { cn } from "~/lib/utils";
import { APP_STORE } from "~/lib/constants";

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4 2.49 1.444c.63.36.63 1.137 0 1.498l-2.49 1.444-2.533-2.533 2.533-2.853zM5.864 2.658 16.8 8.99l-2.302 2.302-8.634-8.634z" />
    </svg>
  );
}

interface AppStoreBadgeProps {
  platform: "ios" | "android";
  variant?: "dark" | "light";
  className?: string;
}

export function AppStoreBadge({
  platform,
  variant = "dark",
  className,
}: AppStoreBadgeProps) {
  const url = APP_STORE[platform];
  const isIos = platform === "ios";

  const content = (
    <>
      {isIos ? (
        <AppleIcon className="size-7 shrink-0" />
      ) : (
        <GooglePlayIcon className="size-6 shrink-0" />
      )}
      <div className="flex flex-col text-left leading-none">
        <span className="text-[10px] font-normal opacity-80">
          {isIos ? "Download on the" : "GET IT ON"}
        </span>
        <span className="text-lg font-semibold leading-tight">
          {isIos ? "App Store" : "Google Play"}
        </span>
      </div>
    </>
  );

  const baseClasses = cn(
    "inline-flex items-center gap-2.5 rounded-xl px-5 py-2.5 transition-opacity hover:opacity-90",
    variant === "dark"
      ? "bg-foreground text-background"
      : "border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground",
    className,
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        toast("앱 출시를 준비 중이에요! 조금만 기다려 주세요.")
      }
      className={cn(baseClasses, "cursor-pointer")}
    >
      {content}
    </button>
  );
}
