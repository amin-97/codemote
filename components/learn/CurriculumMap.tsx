"use client";

import { TopicCard } from "./TopicCard";
import { TRACKS, CURRICULUM, TOTAL_LESSONS } from "@/lib/course/curriculum";
import type { LessonProgress } from "@/types";

interface CurriculumMapProps {
  progress: LessonProgress[];
}

const trackStyles = {
  fundamentals: { dot: "bg-emerald-400", text: "text-emerald-400" },
  patterns: { dot: "bg-sky-400", text: "text-sky-400" },
  advanced: { dot: "bg-amber-400", text: "text-amber-400" },
};

export function CurriculumMap({ progress }: CurriculumMapProps) {
  const completedTotal = progress.filter(
    (p) => p.status === "completed",
  ).length;

  return (
    <div className="space-y-8">
      {/* Overall progress */}
      <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-neutral-300">
              Course Progress
            </h3>
            <p className="mt-1 text-2xl font-bold text-neutral-100">
              {completedTotal}
              <span className="text-base font-normal text-neutral-500">
                {" "}
                / {TOTAL_LESSONS} lessons
              </span>
            </p>
          </div>
          <div className="h-2 w-48 overflow-hidden rounded-full bg-neutral-800">
            <div
              className="h-full rounded-full bg-emerald-500/80 transition-all duration-500"
              style={{ width: `${(completedTotal / TOTAL_LESSONS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tracks */}
      {TRACKS.map((track) => {
        const topics = CURRICULUM.filter((t) => t.track === track.id);
        const style = trackStyles[track.id as keyof typeof trackStyles];

        return (
          <div key={track.id}>
            <div className="mb-3 flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${style.dot}`} />
              <h2 className={`text-sm font-semibold ${style.text}`}>
                {track.title}
              </h2>
              <span className="text-xs text-neutral-600">
                — {track.description}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {topics.map((topic) => {
                const topicProgress = progress.filter(
                  (p) => p.topic_slug === topic.slug,
                );
                return (
                  <TopicCard
                    key={topic.slug}
                    topic={topic}
                    progress={topicProgress}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
