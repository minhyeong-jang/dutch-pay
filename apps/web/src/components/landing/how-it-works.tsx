import { UserPlus, Receipt, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "모임 만들기",
    description: "참가자 이름만 입력하세요",
  },
  {
    icon: Receipt,
    title: "결제 내역 입력",
    description: "누가 얼마를 냈는지, 누가 참여했는지 추가하세요",
  },
  {
    icon: CheckCircle,
    title: "정산 결과 확인",
    description: "누가 누구에게 얼마를 보내면 되는지 바로 확인!",
  },
];

export function HowItWorks() {
  return (
    <section
      aria-label="사용 방법"
      className="bg-background py-16 sm:py-20 lg:py-30"
    >
      <div className="container mx-auto">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-sm font-medium tracking-wide text-primary">
            세 번이면 끝나요
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            이렇게 간단해요
          </h2>
        </div>

        <div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              {/* Connector line (lg only, except last) */}
              {i < steps.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+40px)] hidden h-0 w-[calc(100%-80px+48px)] border-t-2 border-dashed border-primary/20 lg:block" />
              )}

              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                    <step.icon className="size-8 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
