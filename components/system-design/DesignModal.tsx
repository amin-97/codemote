"use client";

import { useState, useEffect, useMemo } from "react";
import { X, Star } from "lucide-react";
import {
  SYSTEM_DESIGN_TOPICS,
  SYSTEM_DESIGN_PROBLEMS,
  CONFIDENCE_LABELS,
} from "@/lib/constants";
import type {
  SystemDesign,
  SystemDesignInsert,
  Difficulty,
  DesignStatus,
} from "@/types";

interface DesignModalProps {
  design?: SystemDesign;
  onSubmit: (d: SystemDesignInsert) => void;
  onClose: () => void;
}

export function DesignModal({ design, onSubmit, onClose }: DesignModalProps) {
  const isEdit = !!design;

  const [title, setTitle] = useState(design?.title || "");
  const [topic, setTopic] = useState(design?.topic || "");
  const [difficulty, setDifficulty] = useState<Difficulty>(
    design?.difficulty || "medium",
  );
  const [status, setStatus] = useState<DesignStatus>(
    design?.status || "in-progress",
  );
  const [notes, setNotes] = useState(design?.notes || "");
  const [keyConcepts, setKeyConcepts] = useState(
    design?.key_concepts?.join(", ") || "",
  );
  const [timeMinutes, setTimeMinutes] = useState(
    design?.time_minutes?.toString() || "",
  );
  const [confidence, setConfidence] = useState(design?.confidence || 0);
  const [studiedAt, setStudiedAt] = useState(
    design?.studied_at
      ? new Date(design.studied_at).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const suggestions = useMemo(() => {
    if (!title || title.length < 2) return [];
    const s = title.toLowerCase();
    return SYSTEM_DESIGN_PROBLEMS.filter((p) => p.toLowerCase().includes(s));
  }, [title]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !topic) return;

    setSubmitting(true);
    try {
      await onSubmit({
        title,
        topic,
        difficulty,
        status,
        notes: notes || undefined,
        key_concepts: keyConcepts
          ? keyConcepts
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
        time_minutes: timeMinutes ? parseInt(timeMinutes) : undefined,
        confidence: confidence > 0 ? confidence : undefined,
        studied_at: new Date(studiedAt).toISOString(),
      });
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-100">
            {isEdit ? "Edit Design" : "Add System Design"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title with suggestions */}
          <div className="relative">
            <label className="mb-1 block text-xs font-medium text-neutral-400">
              Design Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="e.g. Design URL Shortener"
              required
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full z-20 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border border-neutral-700 bg-neutral-800 shadow-xl">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setTitle(s);
                      setShowSuggestions(false);
                    }}
                    className="flex w-full px-3 py-2 text-left text-sm text-neutral-200 transition-colors hover:bg-neutral-700"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Topic + Difficulty */}
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
                {SYSTEM_DESIGN_TOPICS.map((t) => (
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

          {/* Status + Time + Date */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DesignStatus)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-neutral-500"
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="revisit">Revisit</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">
                Time (min)
              </label>
              <input
                type="number"
                value={timeMinutes}
                onChange={(e) => setTimeMinutes(e.target.value)}
                placeholder="45"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-400">
                Date
              </label>
              <input
                type="date"
                value={studiedAt}
                onChange={(e) => setStudiedAt(e.target.value)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-neutral-500"
              />
            </div>
          </div>

          {/* Confidence */}
          <div>
            <label className="mb-2 block text-xs font-medium text-neutral-400">
              Confidence{" "}
              {confidence > 0 && (
                <span className="text-neutral-500">
                  — {CONFIDENCE_LABELS[confidence]}
                </span>
              )}
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setConfidence(n === confidence ? 0 : n)}
                  className="rounded p-1 transition-colors hover:bg-neutral-800"
                >
                  <Star
                    className={`h-5 w-5 ${
                      n <= confidence
                        ? "fill-amber-400 text-amber-400"
                        : "text-neutral-700"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Key Concepts */}
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">
              Key Concepts{" "}
              <span className="text-neutral-600">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={keyConcepts}
              onChange={(e) => setKeyConcepts(e.target.value)}
              placeholder="e.g. consistent-hashing, CDN, sharding"
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500"
            />
          </div>

          {/* Notes / Whiteboard */}
          <div>
            <label className="mb-1 block text-xs font-medium text-neutral-400">
              Notes & Approach
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="High-level architecture, components, data flow, trade-offs, follow-up questions..."
              rows={6}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 font-mono text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-500 resize-none"
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
                  : "Add Design"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
