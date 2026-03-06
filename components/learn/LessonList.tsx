"use client";

import Link from "next/link";
import { Check, BookOpen, Circle } from "lucide-react";
import type { CourseTopic, LessonProgress } from "@/types";

interface LessonListProps {
  topic: CourseTopic;
  progress: LessonProgress[];
}

export function LessonList({ topic, progress }: LessonListProps) {
  function getStatus(lessonSlug: string) {
    return (
      progress.find((p) => p.lesson_slug === lessonSlug)?.status ||
      "not-started"
    );
  }

  const statusIcons = {
    "not-started": <Circle className="h-4 w-4 text-neutral-600" />,
    "in-progress": <BookOpen className="h-4 w-4 text-amber-400" />,
    completed: <Check className="h-4 w-4 text-emerald-400" />,
  };

  return (
    <div className="space-y-2">
      {topic.lessons.map((lesson, i) => {
        const status = getStatus(lesson.slug);
        return (
          <Link
            key={lesson.slug}
            href={`/learn/${topic.slug}/${lesson.slug}`}
            className="group flex items-center gap-4 rounded-lg border border-neutral-800/40 bg-neutral-900/30 px-4 py-3 transition-colors hover:bg-neutral-800/40"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-700/50 bg-neutral-800/50">
              {statusIcons[status]}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-600">
                  {i + 1}.
                </span>
                <h3 className="text-sm font-medium text-neutral-200 group-hover:text-white">
                  {lesson.title}
                </h3>
              </div>
              <p className="mt-0.5 truncate text-xs text-neutral-500">
                {lesson.description}
              </p>
            </div>

            <span className="shrink-0 text-xs text-neutral-600">
              {lesson.duration} min
            </span>
          </Link>
        );
      })}
    </div>
  );
}
