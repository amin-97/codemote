"use client";

import type { TopicStat } from "@/types";

interface TopicProgressProps {
  topics: TopicStat[];
}

export function TopicProgress({ topics }: TopicProgressProps) {
  const maxCount = Math.max(...topics.map((t) => t.solved), 1);

  // Only show topics that have at least 1 solved
  const active = topics.filter((t) => t.solved > 0);

  if (active.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
        <h3 className="mb-4 text-sm font-medium text-neutral-300">
          Topic Breakdown
        </h3>
        <div className="flex h-32 items-center justify-center text-sm text-neutral-600">
          No questions logged yet
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
      <h3 className="mb-4 text-sm font-medium text-neutral-300">
        Topic Breakdown
      </h3>

      <div className="space-y-3">
        {active
          .sort((a, b) => b.solved - a.solved)
          .map((topic) => {
            const pct = (topic.solved / maxCount) * 100;
            return (
              <div key={topic.topic}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">{topic.topic}</span>
                  <span className="font-mono text-neutral-500">
                    {topic.solved}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-neutral-800">
                  <div
                    className="h-full rounded-full bg-emerald-500/80 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
