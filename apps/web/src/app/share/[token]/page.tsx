import type { Metadata } from "next";
import Link from "next/link";

import { BRAND } from "~/lib/constants";
import { SharePageContent } from "./share-page-content";
import { getMockShareData } from "./mock-data";

interface SharePageProps {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const { token } = await params;
  // v1.0: mock data. 향후 sharedLink.resolve API 연동
  const data = getMockShareData(token);

  if (!data) {
    return {
      title: "정산 결과를 찾을 수 없습니다",
    };
  }

  const { template, totalAmount, participantCount } = data;

  return {
    title: `${template.name} 정산 결과`,
    description: `총 ${totalAmount.toLocaleString("ko-KR")}원 · ${participantCount}명 | 내 정산 금액 확인하기`,
    openGraph: {
      title: `${template.name} 정산 결과`,
      description: `총 ${totalAmount.toLocaleString("ko-KR")}원 · ${participantCount}명 | 내 정산 금액 확인하기`,
      url: `${BRAND.url}/share/${token}`,
      siteName: BRAND.name,
      type: "website",
    },
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const { token } = await params;
  const data = getMockShareData(token);

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="text-lg font-semibold text-foreground">
          이 정산 링크가 만료되었거나 존재하지 않아요
        </p>
        <p className="text-sm text-muted-foreground">
          링크를 다시 확인해주세요
        </p>
        <Link
          href="/"
          className="mt-4 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
        >
          새 정산 시작하기
        </Link>
      </div>
    );
  }

  return <SharePageContent data={data} />;
}
