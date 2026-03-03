import { Suspense } from "react";

import TemplateLoading from "./loading";
import { TemplateContent } from "./template-content";

export const dynamic = "force-dynamic";

export default function TemplatePage() {
  return (
    <Suspense fallback={<TemplateLoading />}>
      <TemplateContent />
    </Suspense>
  );
}
