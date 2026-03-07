"use client";

import { Timer } from "@/components/timer/Timer";

export default function TimerPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <Timer />
    </div>
  );
}
