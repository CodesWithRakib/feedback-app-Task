// lib/feedbackStore.ts
import { Feedback } from "@/types/feedback";
import { getDb } from "@/lib/database";

// Helper function to validate email format
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Add feedback to database
export const addFeedback = async (feedback: Feedback) => {
  const db = await getDb();
  await db.run(
    `INSERT INTO feedbacks (id, name, email, feedback, createdAt, updatedAt) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      feedback.id,
      feedback.name,
      feedback.email,
      feedback.feedback,
      feedback.createdAt,
      feedback.updatedAt,
    ]
  );
};

// Find feedback by ID
export const findFeedbackById = async (
  id: string
): Promise<Feedback | undefined> => {
  const db = await getDb();
  return db.get("SELECT * FROM feedbacks WHERE id = ?", [id]);
};

// Update feedback
export const updateFeedback = async (id: string, updatedFeedback: Feedback) => {
  const db = await getDb();
  await db.run(
    `UPDATE feedbacks 
     SET name = ?, email = ?, feedback = ?, updatedAt = ? 
     WHERE id = ?`,
    [
      updatedFeedback.name,
      updatedFeedback.email,
      updatedFeedback.feedback,
      updatedFeedback.updatedAt,
      id,
    ]
  );
};

// Delete feedback
export const deleteFeedback = async (id: string) => {
  const db = await getDb();
  await db.run("DELETE FROM feedbacks WHERE id = ?", [id]);
};

// Get all feedbacks
export const getAllFeedbacks = async (): Promise<Feedback[]> => {
  const db = await getDb();
  return db.all("SELECT * FROM feedbacks ORDER BY createdAt DESC");
};
