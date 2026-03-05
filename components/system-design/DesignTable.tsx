"use client";

import { useState, useMemo } from "react";
import {
  DIFFICULTY_COLORS,
  DESIGN_STATUS_COLORS,
  CONFIDENCE_LABELS,
  SYSTEM_DESIGN_TOPICS,
} from "@/lib/constants";
import {
  Search,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Star,
} from "lucide-react";
import type { SystemDesign } from "@/types";

interface DesignTableProps {
  designs: SystemDesign[];
  onEdit: (d: SystemDesign) => void;
  onDelete: (id: string) => void;
}

type SortField =
  | "title"
  | "difficulty"
  | "topic"
  | "status"
  | "confidence"
  | "studied_at";

export function DesignTable({ designs, onEdit, onDelete }: DesignTableProps) {
  const [search, setSearch] = useState("");
  const [filterTopic, setFilterTopic] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState<SortField>("studied_at");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    let result = [...designs];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(s) ||
          d.topic.toLowerCase().includes(s) ||
          d.key_concepts.some((k) => k.toLowerCase().includes(s)),
      );
    }
    if (filterTopic) result = result.filter((d) => d.topic === filterTopic);
    if (filterStatus) result = result.filter((d) => d.status === filterStatus);

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "studied_at") {
        cmp =
          new Date(a.studied_at).getTime() - new Date(b.studied_at).getTime();
      } else if (sortField === "difficulty") {
        const order = { easy: 0, medium: 1, hard: 2 };
        cmp = order[a.difficulty] - order[b.difficulty];
      } else if (sortField === "confidence") {
        cmp = (a.confidence || 0) - (b.confidence || 0);
      } else {
        cmp = String(a[sortField]).localeCompare(String(b[sortField]));
      }
      return sortAsc ? cmp : -cmp;
    });

    return result;
  }, [designs, search, filterTopic, filterStatus, sortField, sortAsc]);

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

  function ConfidenceStars({ value }: { value: number | null }) {
    if (!value) return <span className="text-neutral-700">—</span>;
    return (
      <div
        className="flex items-center gap-0.5"
        title={CONFIDENCE_LABELS[value]}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${i < value ? "fill-amber-400 text-amber-400" : "text-neutral-700"}`}
          />
        ))}
      </div>
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
            placeholder="Search designs or concepts..."
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
          {SYSTEM_DESIGN_TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 text-sm text-neutral-300 outline-none focus:border-neutral-600"
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="revisit">Revisit</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-neutral-800/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-800/60 bg-neutral-900/30">
              <th
                className="cursor-pointer px-4 py-3 text-left font-medium text-neutral-400 hover:text-neutral-200"
                onClick={() => toggleSort("title")}
              >
                Design <SortIcon field="title" />
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
                onClick={() => toggleSort("confidence")}
              >
                Confidence <SortIcon field="confidence" />
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-left font-medium text-neutral-400 hover:text-neutral-200"
                onClick={() => toggleSort("studied_at")}
              >
                Date <SortIcon field="studied_at" />
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
                  No designs found
                </td>
              </tr>
            ) : (
              filtered.map((d) => {
                const diffColors = DIFFICULTY_COLORS[d.difficulty];
                const statusColors = DESIGN_STATUS_COLORS[d.status];
                return (
                  <tr
                    key={d.id}
                    className="border-b border-neutral-800/30 transition-colors hover:bg-neutral-800/20"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <span className="text-neutral-200">{d.title}</span>
                        {d.key_concepts.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {d.key_concepts.slice(0, 3).map((c, i) => (
                              <span
                                key={i}
                                className="rounded bg-neutral-800/70 px-1.5 py-0.5 text-[10px] text-neutral-500"
                              >
                                {c}
                              </span>
                            ))}
                            {d.key_concepts.length > 3 && (
                              <span className="text-[10px] text-neutral-600">
                                +{d.key_concepts.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-400">{d.topic}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${diffColors.bg} ${diffColors.text}`}
                      >
                        {d.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${statusColors.bg} ${statusColors.text}`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <ConfidenceStars value={d.confidence} />
                    </td>
                    <td className="px-4 py-3 text-neutral-500">
                      {new Date(d.studied_at).toLocaleDateString("en", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onEdit(d)}
                          className="rounded p-1.5 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-neutral-300"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(d.id)}
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
        Showing {filtered.length} of {designs.length} designs
      </p>
    </div>
  );
}
