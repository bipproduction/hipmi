"use client";

import { GlobalEnv } from "@/lib/token";

export function HipmiProvider(
  { children }: { children: React.ReactNode },
  onEnv: (val: string) => void
) {
  onEnv(GlobalEnv.value?.WIBU_PWD as string);
  return children;
}
