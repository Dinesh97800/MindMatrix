import { Suspense } from "react";
import { CmsPagesClient } from "./CmsPagesClient";

export default function CmsPagesPage() {
  return (
    <Suspense fallback={<p>Loading pages...</p>}>
      <CmsPagesClient />
    </Suspense>
  );
}
