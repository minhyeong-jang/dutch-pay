import { Hero } from "~/components/landing/hero";
import { PainPoints } from "~/components/landing/pain-points";
import { HowItWorks } from "~/components/landing/how-it-works";
import { LiveDemo } from "~/components/landing/live-demo";
import { Features } from "~/components/landing/features";
import { FinalCta } from "~/components/landing/final-cta";
import { LandingFooter } from "~/components/landing/landing-footer";
import { LandingHeader } from "~/components/landing/landing-header";
import { JsonLd } from "~/components/seo/json-ld";
import { BRAND } from "~/lib/constants";

export const metadata = {
  title: `${BRAND.name} - ${BRAND.tagline}`,
  description:
    "더치페이, 여행 정산, 회식 정산을 1분 만에. 여러 명이 각각 결제한 복수 건을 교차 정산하세요. 로그인 없이 무료.",
  keywords: [
    "더치페이",
    "정산",
    "회식 정산",
    "여행 정산",
    "교차 정산",
    "N빵",
    "모임 정산",
    "나란",
  ],
  openGraph: {
    title: `${BRAND.name} - ${BRAND.tagline}`,
    description: "여행, 회식, 동호회 정산을 간단하게. 로그인 없이 무료.",
    url: BRAND.url,
    siteName: BRAND.name,
    type: "website" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: `${BRAND.name} - ${BRAND.tagline}`,
    description: "여행, 회식, 동호회 정산을 간단하게. 로그인 없이 무료.",
  },
  alternates: {
    canonical: BRAND.url,
  },
};

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <main>
        <Hero />
        <PainPoints />
        <HowItWorks />
        <LiveDemo />
        <Features />
        <FinalCta />
      </main>
      <LandingFooter />
      <JsonLd />
    </>
  );
}
