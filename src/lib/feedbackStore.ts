// lib/feedbackStore.ts
import { Feedback } from "@/types/feedback";

// Helper function to validate email format
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
// Create a mutable object to hold our feedbacks
export const feedbackStore = {
  feedbacks: [] as Feedback[],

  // Debug method to log current state
  logState: function (action: string) {
    console.log(
      `[${action}] Current feedbacks:`,
      this.feedbacks.map((f) => ({ id: f.id, name: f.name }))
    );
  },

  // Add feedback with logging
  addFeedback: function (feedback: Feedback) {
    console.log("Adding feedback:", feedback);
    this.feedbacks.push(feedback);
    this.logState("ADD");
  },

  // Find feedback with logging
  findFeedbackById: function (id: string) {
    console.log(`Searching for feedback with ID: ${id}`);
    this.logState("SEARCH");
    const found = this.feedbacks.find((f) => f.id === id);
    console.log(`Found feedback:`, found);
    return found;
  },

  // Update feedback with logging
  updateFeedback: function (id: string, updatedFeedback: Feedback) {
    console.log(`Updating feedback with ID: ${id}`);
    this.feedbacks = this.feedbacks.map((f) =>
      f.id === id ? updatedFeedback : f
    );
    this.logState("UPDATE");
  },

  // Delete feedback with logging
  deleteFeedback: function (id: string) {
    console.log(`Deleting feedback with ID: ${id}`);
    this.feedbacks = this.feedbacks.filter((f) => f.id !== id);
    this.logState("DELETE");
  },
};
