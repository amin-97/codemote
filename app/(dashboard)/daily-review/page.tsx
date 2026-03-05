"use client";

import { useEffect, useState } from "react";
import { DailySummary } from "@/components/daily-review/DailySummary";
import { DailyInsights } from "@/components/daily-review/DailyInsights";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Question } from "@/types";

interface ReviewData {
  date: string;
  questions: Question[];
  total: number;
  topics: string[];
  insight: string | null;
}

export default function DailyReviewPage() {
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  });
  const [data, setData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/daily-review?date=${date}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to load review:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [date]);

  function shiftDate(days: number) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    const today = new Date();
    if (d > today) return;
    setDate(d.toISOString().split("T")[0]);
  }

  const displayDate = new Date(date + "T12:00:00").toLocaleDateString("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Date navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => shiftDate(-1)}
          className="rounded-lg border border-neutral-800 p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-neutral-100">
            {displayDate}
          </h2>
          <p className="text-sm text-neutral-500">Daily Review</p>
        </div>
        <button
          onClick={() => shiftDate(1)}
          className="rounded-lg border border-neutral-800 p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="h-32 animate-pulse rounded-xl bg-neutral-900" />
          <div className="h-48 animate-pulse rounded-xl bg-neutral-900" />
        </div>
      ) : data ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DailySummary questions={data.questions} topics={data.topics} />
          </div>
          <DailyInsights
            total={data.total}
            topics={data.topics}
            insight={data.insight}
          />
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-8 text-center text-neutral-500">
          Failed to load review data
        </div>
      )}
    </div>
  );
}
