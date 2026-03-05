"use client";

import { Star } from "lucide-react";
import { CONFIDENCE_LABELS } from "@/lib/constants";

interface TopicStat {
  topic: string;
  completed: number;
  total: number;
  avgConfidence: number | null;
}

interface DesignTopicProgressProps {
  topics: TopicStat[];
}

export function DesignTopicProgress({ topics }: DesignTopicProgressProps) {
  const maxCount = Math.max(...topics.map((t) => t.total), 1);

  return (
    <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
      <h3 className="mb-4 text-sm font-medium text-neutral-300">
        Topic Coverage
      </h3>

      <div className="space-y-3">
        {topics
          .sort((a, b) => b.total - a.total)
          .map((topic) => {
            const pct = (topic.total / maxCount) * 100;
            const completedPct =
              topic.total > 0 ? (topic.completed / topic.total) * 100 : 0;

            return (
              <div key={topic.topic}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">{topic.topic}</span>
                  <div className="flex items-center gap-3">
                    {/* Confidence indicator */}
                    {topic.avgConfidence !== null && (
                      <div
                        className="flex items-center gap-0.5"
                        title={`Avg: ${topic.avgConfidence}/5 — ${CONFIDENCE_LABELS[Math.round(topic.avgConfidence)]}`}
                      >
                        <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                        <span className="font-mono text-neutral-500">
                          {topic.avgConfidence}
                        </span>
                      </div>
                    )}
                    <span className="font-mono text-neutral-500">
                      {topic.completed}/{topic.total}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-neutral-800">
                  {/* Total bar (dimmer) */}
                  <div
                    className="relative h-full rounded-full bg-sky-500/30 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  >
                    {/* Completed portion (brighter) */}
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-sky-400/80 transition-all duration-500"
                      style={{ width: `${completedPct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="mt-3 flex items-center justify-end gap-3 text-[10px] text-neutral-600">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-sky-400/80" />
          Completed
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-sky-500/30" />
          In Progress / Revisit
        </div>
      </div>
    </div>
  );
}
