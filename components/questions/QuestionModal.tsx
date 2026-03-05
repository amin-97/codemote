"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { TOPIC_NAMES, LANGUAGES } from "@/lib/constants";
import type { Question, QuestionInsert, Difficulty, Status } from "@/types";

interface QuestionModalProps {
  question?: Question;
  onSubmit: (q: QuestionInsert) => void;
  onClose: () => void;
}

export function QuestionModal({
  question,
  onSubmit,
  onClose,
}: QuestionModalProps) {
  const isEdit = !!question;

  const [title, setTitle] = useState(question?.title || "");
  const [slug, setSlug] = useState(question?.slug || "");
  const [difficulty, setDifficulty] = useState<Difficulty>(
    question?.difficulty || "medium",
  );
  const [topic, setTopic] = useState(question?.topic || "");
  const [status, setStatus] = useState<Status>(question?.status || "solved");
  const [notes, setNotes] = useState(question?.notes || "");
  const [timeMinutes, setTimeMinutes] = useState(
    question?.time_minutes?.toString() || "",
  );
  const [language, setLanguage] = useState(question?.language || "Python");
  const [leetcodeNum, setLeetcodeNum] = useState(
    question?.leetcode_num?.toString() || "",
  );
  const [solvedAt, setSolvedAt] = useState(
    question?.solved_at
      ? new Date(question.solved_at).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  );
  const [submitting, setSubmitting] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEdit && title) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      );
    }
  }, [title, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !topic) return;

    setSubmitting(true);
    try {
      await onSubmit({
        title,
        slug: slug || undefined,
        difficulty,
        topic,
        status,
        notes: notes || undefined,
        time_minutes: timeMinutes ? parseInt(timeMinutes) : undefined,
        language: language || undefined,
        leetcode_num: leetcodeNum ? parseInt(leetcodeNum) : undefined,
        solved_at: new Date(solvedAt).toISOString(),
      });
    } finally {
      setSubmitting(false);
    }
  }

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-100">
            {isEdit ? "Edit Question" : "Add Question"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">
              Problem Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Two Sum"
              required
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500"
            />
          </div>

          {/* Topic + Difficulty row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">
                Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-neutral-500"
              >
                <option value="">Select topic</option>
                {TOPIC_NAMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-neutral-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Status + Language row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-neutral-500"
              >
                <option value="solved">Solved</option>
                <option value="attempted">Attempted</option>
                <option value="revisit">Revisit</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-neutral-500"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* LeetCode #, Time, Date row */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">
                LC #
              </label>
              <input
                type="number"
                value={leetcodeNum}
                onChange={(e) => setLeetcodeNum(e.target.value)}
                placeholder="1"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">
                Time (min)
              </label>
              <input
                type="number"
                value={timeMinutes}
                onChange={(e) => setTimeMinutes(e.target.value)}
                placeholder="15"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">
                Date
              </label>
              <input
                type="date"
                value={solvedAt}
                onChange={(e) => setSolvedAt(e.target.value)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-neutral-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Approach, key insight, mistakes..."
              rows={3}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !title || !topic}
              className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-white disabled:opacity-50"
            >
              {submitting
                ? "Saving..."
                : isEdit
                  ? "Save Changes"
                  : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
