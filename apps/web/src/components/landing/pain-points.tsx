"use client";

import {
  Receipt,
  Calculator,
  MessageCircle,
  Users,
} from "lucide-react";

import { useLandingFadeIn } from "~/hooks/use-intersection-observer";

const painPoints = [
  {
    icon: Receipt,
    title: "회식 1/2/3차, 각각 결제",
    description:
      "1차는 과장님, 2차는 내가, 3차는 대리가... 정산은 누가 하죠?",
  },
  {
    icon: Calculator,
    title: "여행 가서 계산기 두드리기",
    description:
      "숙소는 A가, 밥은 B가, 택시는 C가 냈는데 계산기 두드려도 맞는지 모르겠어요",
  },
  {
    icon: MessageCircle,
    title: "돈 얘기 꺼내기 어색",
    description: "다들 잊은 것 같은데, 먼저 말하기 좀 그렇고...",
  },
  {
    icon: Users,
    title: "단톡방에서 정산 정리",
    description: "누가 보냈고, 누가 안 보냈는지 추적이 안 돼요",
  },
];

export function PainPoints() {
  useLandingFadeIn();

  return (
    <section
      aria-label="정산의 어려움"
      className="bg-[oklch(0.96_0.005_180)] py-16 sm:py-20 lg:py-30 dark:bg-[oklch(0.17_0.005_180)]"
    >
      <div className="container mx-auto">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-sm font-medium tracking-wide text-primary">
            이런 경험 있으시죠?
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            이런 경험, 한 번쯤 있지 않나요?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {painPoints.map((item, i) => (
            <div
              key={item.title}
              className="landing-fade-in rounded-xl bg-muted/50 p-6"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-4 flex size-14 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="size-8 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
