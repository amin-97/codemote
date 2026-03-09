"use client";

import { useState } from "react";
import { Check, BookOpen, ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import type { LessonStatus } from "@/types";

interface LessonViewerProps {
  topicSlug: string;
  topicTitle: string;
  lessonSlug: string;
  title: string;
  content: string;
  status: LessonStatus;
  notes: string;
  onUpdateProgress: (status: LessonStatus, notes: string) => Promise<void>;
  prevLesson?: { slug: string; title: string } | null;
  nextLesson?: { slug: string; title: string } | null;
  baseHref: string;
}

export function LessonViewer({
  topicSlug,
  topicTitle,
  lessonSlug,
  title,
  content,
  status: initialStatus,
  notes: initialNotes,
  onUpdateProgress,
  prevLesson,
  nextLesson,
  baseHref,
}: LessonViewerProps) {
  const [status, setStatus] = useState<LessonStatus>(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [showNotes, setShowNotes] = useState(!!initialNotes);

  async function handleStatusChange(newStatus: LessonStatus) {
    setSaving(true);
    setStatus(newStatus);
    try {
      await onUpdateProgress(newStatus, notes);
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveNotes() {
    setSaving(true);
    try {
      await onUpdateProgress(status, notes);
    } finally {
      setSaving(false);
    }
  }

  // Simple markdown to HTML (handles ##, ###, **, `, |tables|, -, numbered lists)
  function renderMarkdown(md: string) {
    const lines = md.trim().split("\n");
    const html: string[] = [];
    let inTable = false;
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Headers
      if (line.startsWith("### ")) {
        if (inList) {
          html.push("</ul>");
          inList = false;
        }
        html.push(
          `<h3 class="mt-6 mb-2 text-base font-semibold text-neutral-100">${line.slice(4)}</h3>`,
        );
        continue;
      }
      if (line.startsWith("## ")) {
        if (inList) {
          html.push("</ul>");
          inList = false;
        }
        html.push(
          `<h2 class="mt-8 mb-3 text-lg font-bold text-neutral-50">${line.slice(3)}</h2>`,
        );
        continue;
      }

      // Table
      if (line.startsWith("|")) {
        if (!inTable) {
          if (inList) {
            html.push("</ul>");
            inList = false;
          }
          html.push(
            '<div class="my-4 overflow-x-auto"><table class="w-full text-sm">',
          );
          inTable = true;
        }
        if (line.match(/^\|[\s-|]+$/)) continue; // separator row
        const cells = line
          .split("|")
          .filter(Boolean)
          .map((c) => c.trim());
        const tag =
          html.filter((h) => h.includes("<tr")).length === 0 ? "th" : "td";
        const cellClass =
          tag === "th"
            ? 'class="px-3 py-2 text-left text-xs font-medium text-neutral-400 bg-neutral-800/30"'
            : 'class="px-3 py-2 text-neutral-300 border-t border-neutral-800/40"';
        html.push(
          `<tr>${cells.map((c) => `<${tag} ${cellClass}>${formatInline(c)}</${tag}>`).join("")}</tr>`,
        );
        continue;
      } else if (inTable) {
        html.push("</table></div>");
        inTable = false;
      }

      // Bullet list
      if (line.match(/^- /)) {
        if (!inList) {
          html.push('<ul class="my-2 space-y-1 ml-4">');
          inList = true;
        }
        html.push(
          `<li class="text-sm text-neutral-300 flex gap-2"><span class="text-neutral-600 mt-1.5 shrink-0">•</span><span>${formatInline(line.slice(2))}</span></li>`,
        );
        continue;
      }

      // Numbered list
      if (line.match(/^\d+\. /)) {
        if (!inList) {
          html.push(
            '<ol class="my-2 space-y-1 ml-4 list-decimal list-inside">',
          );
          inList = true;
        }
        const text = line.replace(/^\d+\.\s*/, "");
        html.push(
          `<li class="text-sm text-neutral-300">${formatInline(text)}</li>`,
        );
        continue;
      }

      if (inList) {
        html.push(inList ? "</ul>" : "</ol>");
        inList = false;
      }

      // Empty line
      if (!line.trim()) {
        html.push('<div class="h-3"></div>');
        continue;
      }

      // Paragraph
      html.push(
        `<p class="text-sm leading-relaxed text-neutral-300">${formatInline(line)}</p>`,
      );
    }

    if (inTable) html.push("</table></div>");
    if (inList) html.push("</ul>");
    return html.join("\n");
  }

  function formatInline(text: string): string {
    return text
      .replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="text-neutral-100 font-semibold">$1</strong>',
      )
      .replace(
        /`(.+?)`/g,
        '<code class="rounded bg-neutral-800 px-1.5 py-0.5 text-xs font-mono text-emerald-400">$1</code>',
      )
      .replace(/\\`/g, "`");
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
        <Link href={baseHref} className="hover:text-neutral-300">
          Learn
        </Link>
        <span>/</span>
        <Link
          href={`${baseHref}/${topicSlug}`}
          className="hover:text-neutral-300"
        >
          {topicTitle}
        </Link>
        <span>/</span>
        <span className="text-neutral-300">{title}</span>
      </div>

      {/* Status bar */}
      <div className="mb-6 flex items-center justify-between rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-4">
        <div className="flex items-center gap-2">
          {status === "completed" ? (
            <div className="flex items-center gap-2 text-emerald-400">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">Completed</span>
            </div>
          ) : status === "in-progress" ? (
            <div className="flex items-center gap-2 text-amber-400">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">In Progress</span>
            </div>
          ) : (
            <span className="text-sm text-neutral-500">Not started</span>
          )}
          {saving && (
            <span className="text-xs text-neutral-600">Saving...</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {status !== "in-progress" && (
            <button
              onClick={() => handleStatusChange("in-progress")}
              className="rounded-lg border border-neutral-700 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
            >
              Mark In Progress
            </button>
          )}
          {status !== "completed" && (
            <button
              onClick={() => handleStatusChange("completed")}
              className="rounded-lg bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/25"
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <article
        className="prose-custom"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />

      {/* Notes */}
      <div className="mt-8 rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="flex w-full items-center justify-between text-sm font-medium text-neutral-300"
        >
          <span>Personal Notes</span>
          <span className="text-xs text-neutral-600">
            {showNotes ? "Hide" : "Show"}
          </span>
        </button>
        {showNotes && (
          <div className="mt-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Your notes on this topic..."
              rows={4}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 font-mono text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500 resize-none"
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleSaveNotes}
                disabled={saving}
                className="flex items-center gap-1.5 rounded-lg bg-neutral-800 px-3 py-1.5 text-xs text-neutral-300 transition-colors hover:bg-neutral-700"
              >
                <Save className="h-3 w-3" />
                Save Notes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        {prevLesson ? (
          <Link
            href={`${baseHref}/${topicSlug}/${prevLesson.slug}`}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 px-4 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
          >
            <ChevronLeft className="h-4 w-4" />
            {prevLesson.title}
          </Link>
        ) : (
          <Link
            href={`${baseHref}/${topicSlug}`}
            className="flex items-center gap-2 rounded-lg border border-neutral-800 px-4 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Topic
          </Link>
        )}
        {nextLesson && (
          <Link
            href={`${baseHref}/${topicSlug}/${nextLesson.slug}`}
            className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-white"
          >
            Next: {nextLesson.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
