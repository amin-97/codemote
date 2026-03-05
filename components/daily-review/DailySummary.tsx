"use client";

import { DIFFICULTY_COLORS, STATUS_COLORS } from "@/lib/constants";
import { ExternalLink } from "lucide-react";
import type { Question } from "@/types";

interface DailySummaryProps {
  questions: Question[];
  topics: string[];
}

export function DailySummary({ questions, topics }: DailySummaryProps) {
  if (questions.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-8 text-center">
        <p className="text-lg text-neutral-400">
          No problems solved on this day
        </p>
        <p className="mt-1 text-sm text-neutral-600">
          Try picking a day when you were grinding
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-neutral-300">
          Problems Solved
        </h3>
        <span className="rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-medium text-neutral-300">
          {questions.length} total
        </span>
      </div>

      {/* Topic tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {topics.map((t) => (
          <span
            key={t}
            className="rounded-full bg-neutral-800/70 px-2.5 py-1 text-xs text-neutral-400"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Question list */}
      <div className="space-y-2">
        {questions.map((q) => {
          const diffColors = DIFFICULTY_COLORS[q.difficulty];
          const statusColors = STATUS_COLORS[q.status];
          return (
            <div
              key={q.id}
              className="flex items-center justify-between rounded-lg border border-neutral-800/40 px-4 py-3 transition-colors hover:bg-neutral-800/20"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-neutral-600">
                  #{q.leetcode_num || "—"}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-200">
                      {q.title}
                    </span>
                    {q.slug && (
                      <a
                        href={`https://leetcode.com/problems/${q.slug}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-neutral-400"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  {q.notes && (
                    <p className="mt-0.5 text-xs text-neutral-500">{q.notes}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-medium ${diffColors.bg} ${diffColors.text}`}
                >
                  {q.difficulty}
                </span>
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-medium ${statusColors.bg} ${statusColors.text}`}
                >
                  {q.status}
                </span>
                {q.time_minutes && (
                  <span className="text-xs text-neutral-600">
                    {q.time_minutes}m
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
