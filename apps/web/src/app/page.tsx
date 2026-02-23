import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";

const features = [
  {
    title: "복수 결제 교차 정산",
    description: "1차, 2차, 3차 모두 한 번에",
  },
  {
    title: "카카오톡 바로 공유",
    description: "결과 링크를 카톡으로 바로 전달",
  },
  {
    title: "앱 설치 없이 사용",
    description: "웹브라우저에서 바로 시작",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          토스로 못 하는
          <br />
          복잡한 정산,
          <br />
          <span className="text-primary">1분 만에.</span>
        </h1>

        <p className="mt-6 max-w-md text-lg text-muted-foreground">
          여러 명이 각각 결제한 복수 건을 한 번에 교차 정산합니다.
        </p>

        <Button asChild size="lg" className="mt-10 text-base">
          <Link href="/dashboard">바로 시작하기</Link>
        </Button>

        <p className="mt-4 text-sm text-muted-foreground">
          로그인 없이 바로 사용 가능
        </p>
      </section>

      {/* Features */}
      <section className="bg-muted/40 px-4 py-20">
        <div className="container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CalPayment. All rights reserved.</p>
      </footer>
    </div>
  );
}
