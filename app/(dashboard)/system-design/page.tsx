"use client";

import { useEffect, useState, useCallback } from "react";
import { DesignTable } from "@/components/system-design/DesignTable";
import { DesignModal } from "@/components/system-design/DesignModal";
import { DesignTopicProgress } from "@/components/system-design/DesignTopicProgress";
import { Plus } from "lucide-react";
import type { SystemDesign, SystemDesignInsert } from "@/types";

export default function SystemDesignPage() {
  const [designs, setDesigns] = useState<SystemDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDesign, setEditingDesign] = useState<SystemDesign | null>(null);

  const loadDesigns = useCallback(async () => {
    try {
      const res = await fetch("/api/system-design");
      const data = await res.json();
      setDesigns(data);
    } catch (err) {
      console.error("Failed to load designs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDesigns();
  }, [loadDesigns]);

  async function handleAdd(d: SystemDesignInsert) {
    const res = await fetch("/api/system-design", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    });
    if (res.ok) {
      setModalOpen(false);
      loadDesigns();
    }
  }

  async function handleEdit(d: SystemDesignInsert & { id: string }) {
    const res = await fetch("/api/system-design", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    });
    if (res.ok) {
      setEditingDesign(null);
      loadDesigns();
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/system-design?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) loadDesigns();
  }

  // Build topic stats from data
  const topicCounts: Record<
    string,
    {
      completed: number;
      total: number;
      avgConfidence: number;
      confidenceCount: number;
    }
  > = {};
  designs.forEach((d) => {
    if (!topicCounts[d.topic]) {
      topicCounts[d.topic] = {
        completed: 0,
        total: 0,
        avgConfidence: 0,
        confidenceCount: 0,
      };
    }
    topicCounts[d.topic].total++;
    if (d.status === "completed") topicCounts[d.topic].completed++;
    if (d.confidence) {
      topicCounts[d.topic].avgConfidence += d.confidence;
      topicCounts[d.topic].confidenceCount++;
    }
  });

  const topicStats = Object.entries(topicCounts).map(([topic, stats]) => ({
    topic,
    completed: stats.completed,
    total: stats.total,
    avgConfidence:
      stats.confidenceCount > 0
        ? Math.round((stats.avgConfidence / stats.confidenceCount) * 10) / 10
        : null,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-neutral-100">
            System Design
          </h2>
          <p className="text-sm text-neutral-500">
            {designs.length} designs tracked
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-white"
        >
          <Plus className="h-4 w-4" />
          Add Design
        </button>
      </div>

      {/* Topic Progress */}
      {!loading && topicStats.length > 0 && (
        <DesignTopicProgress topics={topicStats} />
      )}

      {/* Table */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-12 animate-pulse rounded-lg bg-neutral-900"
            />
          ))}
        </div>
      ) : (
        <DesignTable
          designs={designs}
          onEdit={(d) => setEditingDesign(d)}
          onDelete={handleDelete}
        />
      )}

      {/* Add Modal */}
      {modalOpen && (
        <DesignModal onSubmit={handleAdd} onClose={() => setModalOpen(false)} />
      )}

      {/* Edit Modal */}
      {editingDesign && (
        <DesignModal
          design={editingDesign}
          onSubmit={(d) => handleEdit({ ...d, id: editingDesign.id })}
          onClose={() => setEditingDesign(null)}
        />
      )}
    </div>
  );
}
