"use client";

import { useState, useMemo } from "react";
import { DIFFICULTY_COLORS, STATUS_COLORS, TOPIC_NAMES } from "@/lib/constants";
import {
  Search,
  Pencil,
  Trash2,
  ExternalLink,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { Question } from "@/types";

interface QuestionTableProps {
  questions: Question[];
  onEdit: (q: Question) => void;
  onDelete: (id: string) => void;
}

type SortField = "title" | "difficulty" | "topic" | "status" | "solved_at";

export function QuestionTable({
  questions,
  onEdit,
  onDelete,
}: QuestionTableProps) {
  const [search, setSearch] = useState("");
  const [filterTopic, setFilterTopic] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState<SortField>("solved_at");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    let result = [...questions];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (q) =>
          q.title.toLowerCase().includes(s) ||
          q.topic.toLowerCase().includes(s) ||
          (q.leetcode_num && String(q.leetcode_num).includes(s)),
      );
    }
    if (filterTopic) result = result.filter((q) => q.topic === filterTopic);
    if (filterDifficulty)
      result = result.filter((q) => q.difficulty === filterDifficulty);
    if (filterStatus) result = result.filter((q) => q.status === filterStatus);

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "solved_at") {
        cmp = new Date(a.solved_at).getTime() - new Date(b.solved_at).getTime();
      } else if (sortField === "difficulty") {
        const order = { easy: 0, medium: 1, hard: 2 };
        cmp = order[a.difficulty] - order[b.difficulty];
      } else {
        cmp = String(a[sortField]).localeCompare(String(b[sortField]));
      }
      return sortAsc ? cmp : -cmp;
    });

    return result;
  }, [
    questions,
    search,
    filterTopic,
    filterDifficulty,
    filterStatus,
    sortField,
    sortAsc,
  ]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return null;
    return sortAsc ? (
      <ChevronUp className="inline h-3 w-3" />
    ) : (
      <ChevronDown className="inline h-3 w-3" />
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-neutral-800 bg-neutral-900/50 py-2 pl-9 pr-3 text-sm text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-600"
          />
        </div>
        <select
          value={filterTopic}
          onChange={(e) => setFilterTopic(e.target.value)}
          className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm text-neutral-300 outline-none focus:border-neutral-600"
        >
          <option value="">All Topics</option>
          {TOPIC_NAMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
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
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm text-neutral-300 outline-none focus:border-neutral-600"
        >
          <option value="">All Status</option>
          <option value="solved">Solved</option>
          <option value="attempted">Attempted</option>
          <option value="revisit">Revisit</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-neutral-800/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800/60 bg-neutral-900/30">
              <th className="px-4 py-3 text-left font-medium text-neutral-400">
                #
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-left font-medium text-neutral-400 hover:text-neutral-200"
                onClick={() => toggleSort("title")}
              >
                Title <SortIcon field="title" />
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-left font-medium text-neutral-400 hover:text-neutral-200"
                onClick={() => toggleSort("topic")}
              >
                Topic <SortIcon field="topic" />
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-left font-medium text-neutral-400 hover:text-neutral-200"
                onClick={() => toggleSort("difficulty")}
              >
                Difficulty <SortIcon field="difficulty" />
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-left font-medium text-neutral-400 hover:text-neutral-200"
                onClick={() => toggleSort("status")}
              >
                Status <SortIcon field="status" />
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-left font-medium text-neutral-400 hover:text-neutral-200"
                onClick={() => toggleSort("solved_at")}
              >
                Date <SortIcon field="solved_at" />
              </th>
              <th className="px-4 py-3 text-right font-medium text-neutral-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-neutral-600"
                >
                  No questions found
                </td>
              </tr>
            ) : (
              filtered.map((q) => {
                const diffColors = DIFFICULTY_COLORS[q.difficulty];
                const statusColors = STATUS_COLORS[q.status];
                return (
                  <tr
                    key={q.id}
                    className="border-b border-neutral-800/30 transition-colors hover:bg-neutral-800/20"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-neutral-500">
                      {q.leetcode_num || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-200">{q.title}</span>
                        {q.slug && (
                          <a
                            href={`https://leetcode.com/problems/${q.slug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-600 hover:text-neutral-400"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-400">{q.topic}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${diffColors.bg} ${diffColors.text}`}
                      >
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${statusColors.bg} ${statusColors.text}`}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-500">
                      {new Date(q.solved_at).toLocaleDateString("en", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(q)}
                          className="rounded p-1.5 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-300"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(q.id)}
                          className="rounded p-1.5 text-neutral-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-neutral-600">
        Showing {filtered.length} of {questions.length} questions
      </p>
    </div>
  );
}
