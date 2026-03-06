"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getSolutionBySlug, SOLUTIONS } from "@/lib/solutions";
import { DIFFICULTY_COLORS } from "@/lib/constants";
import { SolutionViewer } from "@/components/solutions/SolutionViewer";

export default function SolutionPage() {
  const params = useParams();
  const slug = params.slug as string;
  const meta = getSolutionBySlug(slug);

  const [content, setContent] = useState<{
    title: string;
    content: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const mod = await import(`@/lib/solutions/content/${slug}`);
        setContent(mod.solution || null);
      } catch {
        setContent(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (!meta) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-neutral-400">Solution not found</p>
        <Link
          href="/solutions"
          className="mt-2 text-sm text-sky-400 hover:underline"
        >
          Back to solutions
        </Link>
      </div>
    );
  }

  // Find prev/next
  const idx = SOLUTIONS.findIndex((s) => s.slug === slug);
  const prev = idx > 0 ? SOLUTIONS[idx - 1] : null;
  const next = idx < SOLUTIONS.length - 1 ? SOLUTIONS[idx + 1] : null;

  const diffColors = DIFFICULTY_COLORS[meta.difficulty];

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-900" />
        <div className="h-96 animate-pulse rounded-xl bg-neutral-900" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <Link
        href="/solutions"
        className="mb-4 flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Back to Solutions
      </Link>

      <div className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className={`rounded px-2 py-0.5 text-xs font-medium ${diffColors.bg} ${diffColors.text}`}
          >
            {meta.difficulty}
          </span>
          {meta.companies.map((c) => (
            <span
              key={c}
              className="rounded bg-neutral-800/70 px-1.5 py-0.5 text-[10px] text-neutral-500"
            >
              {c}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-neutral-100">{meta.title}</h1>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {meta.topics.map((t) => (
            <span
              key={t}
              className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-xs text-sky-400/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      {content ? (
        <SolutionViewer content={content.content} />
      ) : (
        <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-12 text-center text-neutral-500">
          Solution content not found
        </div>
      )}

      {/* Prev/Next navigation */}
      <div className="mt-8 flex items-center justify-between">
        {prev ? (
          <Link
            href={`/solutions/${prev.slug}`}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 px-4 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
          >
            <ChevronLeft className="h-4 w-4" />
            {prev.title}
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link
            href={`/solutions/${next.slug}`}
            className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-white"
          >
            Next: {next.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
