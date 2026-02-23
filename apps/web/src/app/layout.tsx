import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/styles.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dutch-pay.vercel.app"),
  title: "더치페이 계산기",
  description:
    "여러 명이 각각 결제한 복수 건을 교차 정산. 토스로 못 하는 복잡한 정산, 1분 만에.",
  openGraph: {
    title: "더치페이 계산기",
    description: "복잡한 정산을 간단하게",
    url: "https://dutch-pay.vercel.app",
    siteName: "더치페이",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-white font-sans antialiased ${geistSans.variable} ${geistMono.variable}`}
      >
        <TRPCReactProvider>{props.children}</TRPCReactProvider>
      </body>
    </html>
  );
}
