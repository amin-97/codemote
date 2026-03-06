"use client";

import { useEffect, useState } from "react";
import { CurriculumMap } from "@/components/learn/CurriculumMap";
import type { LessonProgress } from "@/types";

export default function LearnPage() {
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/learn/progress");
        const data = await res.json();
        setProgress(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load progress:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-20 animate-pulse rounded-xl bg-neutral-900" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl bg-neutral-900"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-neutral-100">
          System Design Course
        </h2>
        <p className="text-sm text-neutral-500">
          Master the building blocks, patterns, and advanced concepts for system
          design interviews
        </p>
      </div>
      <CurriculumMap progress={progress} />
    </div>
  );
}
