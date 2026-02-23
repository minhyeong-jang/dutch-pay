import { AppHeader } from "~/components/layout/app-header";
import { MobileNav } from "~/components/layout/mobile-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="container mx-auto min-h-screen pb-16 pt-14 lg:pb-0">
        {children}
      </main>
      <MobileNav />
    </>
  );
}
