"use client";

import { useEffect, useState, useCallback } from "react";
import { QuestionTable } from "@/components/questions/QuestionTable";
import { QuestionModal } from "@/components/questions/QuestionModal";
import { Plus } from "lucide-react";
import type { Question, QuestionInsert } from "@/types";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const loadQuestions = useCallback(async () => {
    try {
      const res = await fetch("/api/questions");
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error("Failed to load questions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  async function handleAdd(q: QuestionInsert) {
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(q),
    });
    if (res.ok) {
      setModalOpen(false);
      loadQuestions();
    }
  }

  async function handleEdit(q: QuestionInsert & { id: string }) {
    const res = await fetch("/api/questions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(q),
    });
    if (res.ok) {
      setEditingQuestion(null);
      loadQuestions();
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/questions?id=${id}`, { method: "DELETE" });
    if (res.ok) loadQuestions();
  }

  function openEdit(q: Question) {
    setEditingQuestion(q);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-neutral-100">Questions</h2>
          <p className="text-sm text-neutral-500">
            {questions.length} problems logged
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-white"
        >
          <Plus className="h-4 w-4" />
          Add Question
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-12 animate-pulse rounded-lg bg-neutral-900"
            />
          ))}
        </div>
      ) : (
        <QuestionTable
          questions={questions}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Add Modal */}
      {modalOpen && (
        <QuestionModal
          onSubmit={handleAdd}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Edit Modal */}
      {editingQuestion && (
        <QuestionModal
          question={editingQuestion}
          onSubmit={(q) => handleEdit({ ...q, id: editingQuestion.id })}
          onClose={() => setEditingQuestion(null)}
        />
      )}
    </div>
  );
}
