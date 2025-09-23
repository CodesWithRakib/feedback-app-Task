"use client";

import { Feedback } from "@/types/feedback";
import Swal from "sweetalert2";

interface FeedbackItemProps {
  feedback: Feedback;
  onEdit: (feedback: Feedback) => void;
  onDelete: (id: string) => void;
}

export default function FeedbackItem({
  feedback,
  onEdit,
  onDelete,
}: FeedbackItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#1e293b",
      color: "#f1f5f9",
    });

    if (result.isConfirmed) {
      onDelete(feedback.id);
    }
  };

  return (
    <div className="group bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="font-bold text-white group-hover:text-cyan-300 transition-colors duration-200">
            {feedback.name}
          </p>
          <p className="text-slate-400 text-sm">{feedback.email}</p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(feedback)}
            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-white/10 rounded-lg transition-all duration-200"
            title="Edit feedback"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-lg transition-all duration-200"
            title="Delete feedback"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-slate-200 leading-relaxed group-hover:text-white transition-colors duration-200 mb-3">
        {feedback.feedback}
      </p>

      <div className="flex justify-between items-center text-xs text-slate-500">
        <span>Created: {formatDate(feedback.createdAt)}</span>
        {feedback.updatedAt && feedback.updatedAt !== feedback.createdAt && (
          <span>Updated: {formatDate(feedback.updatedAt)}</span>
        )}
      </div>
    </div>
  );
}
