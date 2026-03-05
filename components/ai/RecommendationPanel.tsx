"use client";

import { RecommendationCard } from "@/components/ai/RecommendationCard";
import { Sparkles } from "lucide-react";
import type { AIRecommendation } from "@/types";

interface RecommendationPanelProps {
  recommendations: AIRecommendation[];
  summary: string;
}

export function RecommendationPanel({
  recommendations,
  summary,
}: RecommendationPanelProps) {
  if (recommendations.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-8 text-center">
        <p className="text-neutral-400">No recommendations generated.</p>
        <p className="mt-1 text-sm text-neutral-600">
          Log some questions first so the AI has data to analyze.
        </p>
      </div>
    );
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sorted = [...recommendations].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
  );

  return (
    <div className="space-y-6">
      {/* Summary */}
      {summary && (
        <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-medium text-neutral-300">
              Overall Assessment
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-neutral-400">{summary}</p>
        </div>
      )}

      {/* Recommendation cards */}
      <div className="space-y-4">
        {sorted.map((rec, i) => (
          <RecommendationCard key={i} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}
