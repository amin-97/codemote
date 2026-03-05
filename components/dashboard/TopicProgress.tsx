"use client";

import type { TopicStat } from "@/types";

interface TopicProgressProps {
  topics: TopicStat[];
}

export function TopicProgress({ topics }: TopicProgressProps) {
  return (
    <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
      <h3 className="mb-4 text-sm font-medium text-neutral-300">
        Topic Progress
      </h3>

      <div className="space-y-3">
        {topics.map((topic) => {
          const pct = topic.total > 0 ? (topic.solved / topic.total) * 100 : 0;
          return (
            <div key={topic.topic}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-neutral-400">{topic.topic}</span>
                <span className="font-mono text-neutral-500">
                  {topic.solved}/{topic.total}
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
