import { NextResponse } from "next/server";
import { db } from "@/db/db";
import { students } from "@/db/schema";

interface RegistrationData {
  matricNumber: string;
  name: string;
  email: string;
  gender: "Male" | "Female";
  phone: string;
  address: string;
  dob: string; // Consider using Date type if necessary
}

// POST handler for saving registration data
export async function POST(req: Request) {
  try {
    const {
      matricNumber,
      name,
      email,
      gender,
      phone,
      address,
      dob,
    }: RegistrationData = await req.json();

    // Insert data into the database
    await db.insert(students).values({
      matricNumber,
      name,
      email,
      gender,
      phone,
      address,
      dob,
    });

    return NextResponse.json(
      { message: "Data successfully saved!" },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Use `unknown` type instead of `any`
    if (error instanceof Error) {
      // Check if the error is an instance of Error
      console.error("Error saving data:", error.message);

      // Check for unique constraint violation (PostgreSQL error code: 23505)
      if (
        error.message.includes("unique constraint") &&
        error.message.includes("students_email_unique")
      ) {
        return NextResponse.json(
          { message: "A user with this email already exists." },
          { status: 409 } // HTTP 409 Conflict
        );
      }
    }

    // Handle other errors
    return NextResponse.json(
      {
        message: "An error occurred while saving data. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Fetch all students from the database
    const allStudents = await db.select().from(students);
    return NextResponse.json(allStudents);
  } catch (error) {
    console.error("Error fetching data:3", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
