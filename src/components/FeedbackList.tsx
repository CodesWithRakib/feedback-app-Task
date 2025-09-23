"use client";

import { Feedback } from "@/types/feedback";
import FeedbackItem from "./FeedbackItem";

interface FeedbackListProps {
  feedbacks: Feedback[];
  onEdit: (feedback: Feedback) => void;
  onDelete: (id: string) => void;
}

export default function FeedbackList({
  feedbacks,
  onEdit,
  onDelete,
}: FeedbackListProps) {
  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 mb-3">
          <svg
            className="w-16 h-16 mx-auto opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <p className="text-slate-400 text-lg">
          No feedback yet. Be the first to share!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          feedback={feedback}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
