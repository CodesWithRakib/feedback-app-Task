"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import FeedbackForm from "@/components/FeedbackForm";
import FeedbackList from "@/components/FeedbackList";
import EditModal from "@/components/EditModal";
import { Feedback } from "@/types/feedback";

export default function Home() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);

  // Load from API on mount
  useEffect(() => {
    loadFeedbacks();
  }, []);

  // Load feedbacks from API
  const loadFeedbacks = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/feedback");
      const result = await res.json();

      if (result.success) {
        setFeedbacks(result.data);
        localStorage.setItem("feedbacks", JSON.stringify(result.data));
      } else {
        toast.error("Failed to load feedbacks");
        const saved = localStorage.getItem("feedbacks");
        if (saved) {
          setFeedbacks(JSON.parse(saved));
        }
      }
    } catch (error) {
      console.error("Load error:", error);
      toast.error("Failed to load feedbacks");
      const saved = localStorage.getItem("feedbacks");
      if (saved) {
        setFeedbacks(JSON.parse(saved));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Sync to localStorage whenever feedbacks change
  useEffect(() => {
    if (feedbacks.length > 0) {
      localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    }
  }, [feedbacks]);

  // Handle new feedback submission
  const handleSubmit = async (data: {
    name: string;
    email: string;
    feedback: string;
  }) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setFeedbacks((prev) => [...prev, result.data]);
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit feedback");

      // Fallback
      const newFeedback: Feedback = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setFeedbacks((prev) => [...prev, newFeedback]);
      toast.success("Feedback saved locally (offline mode)");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit button click
  const handleEdit = (feedback: Feedback) => {
    setEditingFeedback(feedback);
    setIsEditModalOpen(true);
  };

  // Handle modal close
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingFeedback(null);
  };

  // Handle save in edit modal
  const handleSaveEdit = async (data: {
    name: string;
    email: string;
    feedback: string;
  }) => {
    if (!editingFeedback) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/feedback/${editingFeedback.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setFeedbacks((prev) =>
          prev.map((f) => (f.id === editingFeedback.id ? result.data : f))
        );
        handleCloseEditModal();
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update feedback");

      // Fallback
      const updatedFeedback: Feedback = {
        ...editingFeedback,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setFeedbacks((prev) =>
        prev.map((f) => (f.id === editingFeedback.id ? updatedFeedback : f))
      );
      handleCloseEditModal();
      toast.success("Feedback updated locally (offline mode)");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        setFeedbacks((prev) => prev.filter((f) => f.id !== id));
        toast.success(result.message);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete feedback");

      // Fallback
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
      toast.success("Feedback deleted locally (offline mode)");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">
          Feedback Hub
        </h1>
        <p className="text-slate-300 text-lg">Share your thoughts with us</p>
      </div>

      {/* Feedback Form */}
      <FeedbackForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

      {/* Feedback List */}
      <section className="w-full max-w-2xl mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Community Feedback</h2>
          <div className="flex items-center space-x-3">
            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-400">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-sm">Loading...</span>
              </div>
            )}
            <span className="bg-white/10 text-slate-300 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {feedbacks.length} {feedbacks.length === 1 ? "entry" : "entries"}
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <svg
                className="animate-spin h-8 w-8 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
            <p className="text-slate-400">Loading feedbacks...</p>
          </div>
        ) : (
          <FeedbackList
            feedbacks={feedbacks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </section>

      {/* Edit Modal */}
      <EditModal
        feedback={editingFeedback}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        isSubmitting={isSubmitting}
      />

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-slate-500 text-sm">
          Made with ❤️ for better user experiences
        </p>
      </footer>
    </main>
  );
}
