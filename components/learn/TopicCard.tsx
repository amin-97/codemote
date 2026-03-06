"use client";

import Link from "next/link";
import { ProgressRing } from "./ProgressRing";
import type { CourseTopic, LessonProgress } from "@/types";

interface TopicCardProps {
  topic: CourseTopic;
  progress: LessonProgress[];
}

export function TopicCard({ topic, progress }: TopicCardProps) {
  const totalLessons = topic.lessons.length;
  const completedLessons = progress.filter(
    (p) => p.status === "completed",
  ).length;
  const inProgressLessons = progress.filter(
    (p) => p.status === "in-progress",
  ).length;
  const progressRatio = totalLessons > 0 ? completedLessons / totalLessons : 0;

  const trackColors = {
    fundamentals: "border-l-emerald-500/50",
    patterns: "border-l-sky-500/50",
    advanced: "border-l-amber-500/50",
  };

  return (
    <Link
      href={`/learn/${topic.slug}`}
      className={`group flex items-center gap-4 rounded-xl border border-neutral-800/60 border-l-2 ${trackColors[topic.track]} bg-neutral-900/50 p-4 transition-colors hover:bg-neutral-800/40`}
    >
      <ProgressRing progress={progressRatio} size={44} strokeWidth={3} />

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-neutral-100 group-hover:text-white">
          {topic.title}
        </h3>
        <p className="mt-0.5 truncate text-xs text-neutral-500">
          {topic.description}
        </p>
        <div className="mt-1.5 flex items-center gap-3 text-xs text-neutral-600">
          <span>
            {completedLessons}/{totalLessons} lessons
          </span>
          {inProgressLessons > 0 && (
            <span className="text-amber-500/70">
              {inProgressLessons} in progress
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
