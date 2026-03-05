"use client";

import { Sparkles, Target, BookOpen } from "lucide-react";

interface DailyInsightsProps {
  total: number;
  topics: string[];
  insight: string | null;
}

export function DailyInsights({ total, topics, insight }: DailyInsightsProps) {
  return (
    <div className="space-y-4">
      {/* Quick stats */}
      <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
        <h3 className="mb-3 text-sm font-medium text-neutral-300">
          Quick Stats
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-400/10 p-2">
              <Target className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-neutral-100">{total}</p>
              <p className="text-xs text-neutral-500">Problems solved</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-sky-400/10 p-2">
              <BookOpen className="h-4 w-4 text-sky-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-neutral-100">
                {topics.length}
              </p>
              <p className="text-xs text-neutral-500">Topics covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <h3 className="text-sm font-medium text-neutral-300">AI Insight</h3>
        </div>
        {insight ? (
          <p className="text-sm leading-relaxed text-neutral-400">{insight}</p>
        ) : total === 0 ? (
          <p className="text-sm text-neutral-600">
            No activity to analyze for this day.
          </p>
        ) : (
          <p className="text-sm text-neutral-600">Generating insight...</p>
        )}
      </div>
    </div>
  );
}
