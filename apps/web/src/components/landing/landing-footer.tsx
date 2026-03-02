import Link from "next/link";

import { BRAND } from "~/lib/constants";

export function LandingFooter() {
  return (
    <footer className="bg-foreground py-12 text-background/70 lg:py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-background">{BRAND.name}</p>
            <p className="mt-1 text-sm">{BRAND.tagline}</p>
          </div>

          {/* Service links */}
          <div>
            <p className="mb-3 text-sm font-semibold text-background">
              서비스
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/template/new"
                  className="transition-colors hover:text-background"
                >
                  시작하기
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="mb-3 text-sm font-semibold text-background">
              법적 고지
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="transition-colors hover:text-background">
                  이용약관
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-background">
                  개인정보처리방침
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-background/10 pt-8 text-center text-xs">
          &copy; 2025-{new Date().getFullYear()} {BRAND.name}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
