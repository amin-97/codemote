"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { LessonViewer } from "@/components/learn/LessonViewer";
import { getTopicBySlug } from "@/lib/course/curriculum";
import type { LessonProgress, LessonStatus } from "@/types";

export default function LessonPage() {
  const params = useParams();
  const topicSlug = params.topicSlug as string;
  const lessonSlug = params.lessonSlug as string;

  const topic = getTopicBySlug(topicSlug);
  const [content, setContent] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [progress, setProgress] = useState<LessonProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Load content dynamically
        const trackMap: Record<string, string> = {
          fundamentals: "fundamentals",
          patterns: "patterns",
          advanced: "advanced",
        };
        const track = topic?.track ? trackMap[topic.track] : null;
        if (track) {
          const mod = await import(
            `@/lib/course/content/${track}/${topicSlug}`
          );
          setContent(mod.lessons?.[lessonSlug] || null);
        }

        // Load progress
        const res = await fetch(`/api/learn/progress?topic=${topicSlug}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const lessonProgress = data.find(
            (p: LessonProgress) => p.lesson_slug === lessonSlug,
          );
          setProgress(lessonProgress || null);
        }
      } catch (err) {
        console.error("Failed to load lesson:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [topicSlug, lessonSlug, topic?.track]);

  async function handleUpdateProgress(status: LessonStatus, notes: string) {
    await fetch("/api/learn/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic_slug: topicSlug,
        lesson_slug: lessonSlug,
        status,
        notes,
      }),
    });
  }

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

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-8 w-64 animate-pulse rounded bg-neutral-900" />
        <div className="h-16 animate-pulse rounded-xl bg-neutral-900" />
        <div className="h-96 animate-pulse rounded-xl bg-neutral-900" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-neutral-400">Lesson not found</p>
        <Link
          href={`/learn/${topicSlug}`}
          className="mt-2 text-sm text-sky-400 hover:underline"
        >
          Back to {topic.title}
        </Link>
      </div>
    );
  }

  // Find prev/next lessons
  const lessonIndex = topic.lessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = lessonIndex > 0 ? topic.lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < topic.lessons.length - 1
      ? topic.lessons[lessonIndex + 1]
      : null;

  return (
    <LessonViewer
      topicSlug={topicSlug}
      topicTitle={topic.title}
      lessonSlug={lessonSlug}
      title={content.title}
      content={content.content}
      status={progress?.status || "not-started"}
      notes={progress?.notes || ""}
      onUpdateProgress={handleUpdateProgress}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    />
  );
}
