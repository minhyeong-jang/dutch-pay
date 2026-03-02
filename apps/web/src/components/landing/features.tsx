import { Gift, Zap, TrendingDown, Share2 } from "lucide-react";

const features = [
  {
    icon: Gift,
    title: "완전 무료",
    description: "광고 없이, 회원가입 없이, 모든 기능을 무료로 사용하세요",
  },
  {
    icon: Zap,
    title: "로그인 불필요",
    description: "접속하자마자 바로 시작. 번거로운 회원가입이 없어요",
  },
  {
    icon: TrendingDown,
    title: "최소 송금",
    description:
      "최적 경로를 자동으로 계산해 송금 횟수를 줄여드려요",
  },
  {
    icon: Share2,
    title: "결과 공유",
    description: "정산 결과를 링크 하나로 카카오톡에 공유하세요",
  },
];

export function Features() {
  return (
    <section
      aria-label="핵심 특징"
      className="bg-background py-16 sm:py-20 lg:py-30"
    >
      <div className="container mx-auto">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-sm font-medium tracking-wide text-primary">
            나란이 특별한 이유
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            왜 나란인가요?
          </h2>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 flex size-14 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="size-8 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
