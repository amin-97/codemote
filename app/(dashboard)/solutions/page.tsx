"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { SOLUTIONS } from "@/lib/solutions";
import { DIFFICULTY_COLORS } from "@/lib/constants";

export default function SolutionsPage() {
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const filtered = SOLUTIONS.filter((s) => {
    const matchesSearch =
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.topics.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      s.companies.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    const matchesDifficulty =
      !filterDifficulty || s.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-neutral-100">
          System Design Solutions
        </h2>
        <p className="text-sm text-neutral-500">
          {SOLUTIONS.length} detailed solutions to classic system design
          interview problems
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by name, topic, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 py-2 pl-9 pr-3 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-600"
          />
        </div>
        <select
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm text-neutral-300 outline-none focus:border-neutral-600"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const diffColors = DIFFICULTY_COLORS[s.difficulty];
          return (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5 transition-colors hover:bg-neutral-800/40"
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-medium ${diffColors.bg} ${diffColors.text}`}
                >
                  {s.difficulty}
                </span>
              </div>

              <h3 className="mb-1 text-sm font-semibold text-neutral-100 group-hover:text-white">
                {s.title}
              </h3>

              {/* Companies */}
              <div className="mb-3 flex flex-wrap gap-1">
                {s.companies.map((c) => (
                  <span
                    key={c}
                    className="rounded bg-neutral-800/70 px-1.5 py-0.5 text-[10px] text-neutral-500"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-1">
                {s.topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] text-sky-400/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-12 text-center text-neutral-500">
          No solutions match your search
        </div>
      )}
    </div>
  );
}
