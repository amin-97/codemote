"use client";

import { DIFFICULTY_COLORS, STATUS_COLORS } from "@/lib/constants";
import type { Question } from "@/types";

interface RecentActivityProps {
  questions: Question[];
}

export function RecentActivity({ questions }: RecentActivityProps) {
  return (
    <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
      <h3 className="mb-4 text-sm font-medium text-neutral-300">
        Recent Activity
      </h3>

      {questions.length === 0 ? (
        <div className="flex h-32 items-center justify-center text-sm text-neutral-600">
          No questions logged yet
        </div>
      ) : (
        <div className="space-y-2">
          {questions.map((q) => {
            const diffColors = DIFFICULTY_COLORS[q.difficulty];
            const statusColors = STATUS_COLORS[q.status];
            const solvedDate = new Date(q.solved_at);
            const timeAgo = getTimeAgo(solvedDate);

            return (
              <div
                key={q.id}
                className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-neutral-800/30"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${diffColors.dot}`}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm text-neutral-200">
                      {q.title}
                    </p>
                    <p className="text-xs text-neutral-500">{q.topic}</p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${statusColors.bg} ${statusColors.text}`}
                  >
                    {q.status}
                  </span>
                  <span className="text-xs text-neutral-600">{timeAgo}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en", { month: "short", day: "numeric" });
}
