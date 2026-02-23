import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import { Toaster } from "~/components/ui/sonner";
import { BRAND } from "~/lib/constants";

import "~/app/styles.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "100 900",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} - ${BRAND.tagline}`,
    template: `%s | ${BRAND.name}`,
  },
  description: `여러 명이 각각 결제한 복수 건을 교차 정산. 토스로 못 하는 ${BRAND.tagline}.`,
  openGraph: {
    title: `${BRAND.name} - ${BRAND.tagline}`,
    description: "여행, 회식, 동호회 정산을 간단하게",
    url: BRAND.url,
    siteName: BRAND.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${pretendard.variable} ${geistMono.variable}`}
        style={{ wordBreak: "keep-all" }}
      >
        {props.children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
