import { NextRequest, NextResponse } from "next/server";
import {
  isValidEmail,
  findFeedbackById,
  updateFeedback,
  deleteFeedback,
} from "@/lib/feedbackStore";

// GET /api/feedback/[id] - Get single feedback by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Feedback ID is required" },
        { status: 400 }
      );
    }

    const feedback = await findFeedbackById(id);

    if (!feedback) {
      return NextResponse.json(
        { success: false, error: "Feedback not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.error("GET by ID error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch feedback: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}

// PUT /api/feedback/[id] - Update feedback by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Feedback ID is required" },
        { status: 400 }
      );
    }

    // Validation
    if (!data.name?.trim() || !data.email?.trim() || !data.feedback?.trim()) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (data.feedback.length > 1000) {
      return NextResponse.json(
        { success: false, error: "Feedback must be less than 1000 characters" },
        { status: 400 }
      );
    }

    // Find existing feedback
    const existingFeedback = await findFeedbackById(id);
    if (!existingFeedback) {
      return NextResponse.json(
        { success: false, error: "Feedback not found" },
        { status: 404 }
      );
    }

    // Update feedback
    const updatedFeedback = {
      ...existingFeedback,
      name: data.name.trim(),
      email: data.email.trim(),
      feedback: data.feedback.trim(),
      updatedAt: new Date().toISOString(),
    };

    await updateFeedback(id, updatedFeedback);

    return NextResponse.json({
      success: true,
      message: "Feedback updated successfully",
      data: updatedFeedback,
    });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Invalid JSON data: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 400 }
    );
  }
}

// DELETE /api/feedback/[id] - Delete feedback by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Feedback ID is required" },
        { status: 400 }
      );
    }

    // Check if feedback exists
    const existingFeedback = await findFeedbackById(id);
    if (!existingFeedback) {
      return NextResponse.json(
        { success: false, error: "Feedback not found" },
        { status: 404 }
      );
    }

    // Delete feedback
    await deleteFeedback(id);

    return NextResponse.json({
      success: true,
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to delete feedback: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
