import { db } from "@/db/db"; // Your Drizzle ORM database instance
import { students } from "@/db/schema"; // Your Drizzle table schema

export async function GET() {
  try {
    const users = await db.select().from(students); // Fetch data from the "students" table
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Failed to fetch users", { status: 500 });
  }
}
