import { Suspense } from "react";

import DashboardLoading from "./loading";
import { DashboardContent } from "./dashboard-content";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
