import { BRAND } from "~/lib/constants";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLd() {
  return (
    <>
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: BRAND.name,
          url: BRAND.url,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "KRW",
          },
          description: `${BRAND.tagline}. 여러 명이 각각 결제한 복수 건을 교차 정산하는 무료 웹 앱.`,
        }}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: BRAND.name,
          url: BRAND.url,
        }}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "나란은 무료인가요?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "네, 나란은 완전 무료입니다. 광고도 없고, 회원가입도 필요 없습니다.",
              },
            },
            {
              "@type": "Question",
              name: "로그인 없이 사용할 수 있나요?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "네, 로그인 없이 바로 사용할 수 있습니다. 접속하자마자 정산을 시작하세요.",
              },
            },
            {
              "@type": "Question",
              name: "토스 정산과 무엇이 다른가요?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "토스/카카오페이 정산은 1:1 단건만 가능하지만, 나란은 여러 명이 각각 결제한 복수 건을 교차 정산할 수 있습니다.",
              },
            },
          ],
        }}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "나란으로 정산하는 방법",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "모임 만들기",
              text: "참가자 이름을 입력하세요.",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "결제 내역 입력",
              text: "누가 얼마를 냈는지, 누가 참여했는지 추가하세요.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "정산 결과 확인",
              text: "누가 누구에게 얼마를 보내면 되는지 바로 확인하세요.",
            },
          ],
        }}
      />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: BRAND.name,
              item: BRAND.url,
            },
          ],
        }}
      />
    </>
  );
}
