"use client";

import { AlertTriangle, ArrowRight, Minus } from "lucide-react";
import type { AIRecommendation } from "@/types";

interface RecommendationCardProps {
  recommendation: AIRecommendation;
}

const priorityConfig = {
  high: {
    border: "border-red-500/20",
    bg: "bg-red-500/5",
    badge: "bg-red-500/15 text-red-400",
    icon: AlertTriangle,
    label: "High Priority",
  },
  medium: {
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    badge: "bg-amber-500/15 text-amber-400",
    icon: ArrowRight,
    label: "Medium Priority",
  },
  low: {
    border: "border-neutral-500/20",
    bg: "bg-neutral-500/5",
    badge: "bg-neutral-500/15 text-neutral-400",
    icon: Minus,
    label: "Low Priority",
  },
};

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const config = priorityConfig[recommendation.priority];

  return (
    <div className={`rounded-xl border ${config.border} ${config.bg} p-5`}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-neutral-100">
          {recommendation.topic}
        </h3>
        <span
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.badge}`}
        >
          <config.icon className="h-3 w-3" />
          {config.label}
        </span>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-neutral-400">
        {recommendation.reason}
      </p>

      {recommendation.suggested_questions.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium text-neutral-500">
            Suggested problems:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {recommendation.suggested_questions.map((q, i) => (
              <span
                key={i}
                className="rounded-md bg-neutral-800/70 px-2.5 py-1 text-xs text-neutral-300"
              >
                {q}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
