"use client";

import { useState } from "react";
import { RecommendationPanel } from "@/components/ai/RecommendationPanel";
import { Sparkles, RefreshCw } from "lucide-react";
import type { AIRecommendation } from "@/types";

export default function AIRecommendPage() {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(
    [],
  );
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/recommend");
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setRecommendations(data.recommendations || []);
      setSummary(data.summary || "");
      setLoaded(true);
    } catch {
      setError("Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-neutral-100">
            AI Recommendations
          </h2>
          <p className="text-sm text-neutral-500">
            Gemini analyzes your progress and suggests what to study next
          </p>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-white disabled:opacity-50"
        >
          {loading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {loading
            ? "Analyzing..."
            : loaded
              ? "Refresh"
              : "Generate Recommendations"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {!loaded && !loading && !error && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-800/60 bg-neutral-900/50 py-20">
          <Sparkles className="mb-4 h-10 w-10 text-neutral-700" />
          <p className="text-lg font-medium text-neutral-400">
            Ready to analyze your progress
          </p>
          <p className="mt-1 text-sm text-neutral-600">
            Click the button above to get personalized recommendations
          </p>
        </div>
      )}

      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-36 animate-pulse rounded-xl bg-neutral-900"
            />
          ))}
        </div>
      )}

      {loaded && !loading && (
        <RecommendationPanel
          recommendations={recommendations}
          summary={summary}
        />
      )}
    </div>
  );
}
