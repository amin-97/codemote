"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/questions": "Questions",
  "/system-design": "System Design",
  "/learn": "Learn",
  "/solutions": "Solutions",
  "/timer": "Timer",
  "/daily-review": "Daily Review",
  "/ai-recommend": "AI Recommendations",
};

export function Topbar() {
  const pathname = usePathname();
  const title =
    pageTitles[pathname] ||
    (pathname.startsWith("/learn")
      ? "Learn"
      : pathname.startsWith("/solutions")
        ? "Solutions"
        : "Dashboard");

  return (
    <header className="flex h-14 items-center justify-between border-b border-neutral-800/60 bg-neutral-950 px-6">
      <h1 className="text-lg font-semibold text-neutral-100">{title}</h1>
      <UserButton
        appearance={{
          elements: {
            avatarBox: "h-8 w-8",
          },
        }}
      />
    </header>
  );
}
