import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/database";
import { isValidEmail } from "@/lib/feedbackStore";

//Create new feedback
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const db = await getDb();

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

    // Create new feedback
    const id = Math.random().toString(36).substring(2, 15);
    const now = new Date().toISOString();

    await db.run(
      `INSERT INTO feedbacks (id, name, email, feedback, createdAt, updatedAt) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, data.name.trim(), data.email.trim(), data.feedback.trim(), now, now]
    );

    const newFeedback = {
      id,
      name: data.name.trim(),
      email: data.email.trim(),
      feedback: data.feedback.trim(),
      createdAt: now,
      updatedAt: now,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Feedback created successfully",
        data: newFeedback,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST error:", error);
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

// Get all feedbacks
export async function GET() {
  try {
    const db = await getDb();
    const feedbacks = await db.all(
      "SELECT * FROM feedbacks ORDER BY createdAt DESC"
    );

    return NextResponse.json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch feedbacks: " +
          (error instanceof Error ? error.message : String(error)),
      },
      { status: 500 }
    );
  }
}
