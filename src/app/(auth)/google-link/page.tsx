import { GoogleLinkView } from "@/app_modules/auth/google_link/view";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <GoogleLinkView />
    </Suspense>
  );
}
