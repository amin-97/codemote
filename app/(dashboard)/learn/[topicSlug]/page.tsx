"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { LessonList } from "@/components/learn/LessonList";
import { ProgressRing } from "@/components/learn/ProgressRing";
import { getTopicBySlug } from "@/lib/course/curriculum";
import type { LessonProgress } from "@/types";

export default function TopicPage() {
  const params = useParams();
  const topicSlug = params.topicSlug as string;
  const topic = getTopicBySlug(topicSlug);

  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/learn/progress?topic=${topicSlug}`);
        const data = await res.json();
        setProgress(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load progress:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [topicSlug]);

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-neutral-400">Topic not found</p>
        <Link
          href="/learn"
          className="mt-2 text-sm text-sky-400 hover:underline"
        >
          Back to course
        </Link>
      </div>
    );
  }

  const completed = progress.filter((p) => p.status === "completed").length;
  const total = topic.lessons.length;

  const trackLabels = {
    fundamentals: { label: "Fundamentals", color: "text-emerald-400" },
    patterns: { label: "Design Patterns", color: "text-sky-400" },
    advanced: { label: "Advanced", color: "text-amber-400" },
  };
  const track = trackLabels[topic.track];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/learn"
          className="mb-3 flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Back to Course
        </Link>

        <div className="flex items-center gap-4">
          <ProgressRing
            progress={total > 0 ? completed / total : 0}
            size={52}
            strokeWidth={3.5}
          />
          <div>
            <span className={`text-xs font-medium ${track.color}`}>
              {track.label}
            </span>
            <h2 className="text-xl font-semibold text-neutral-100">
              {topic.title}
            </h2>
            <p className="text-sm text-neutral-500">{topic.description}</p>
          </div>
        </div>
      </div>

      {/* Lessons */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: topic.lessons.length }).map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-lg bg-neutral-900"
            />
          ))}
        </div>
      ) : (
        <LessonList topic={topic} progress={progress} />
      )}
    </div>
  );
}
