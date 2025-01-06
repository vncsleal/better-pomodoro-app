import { getTasks } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const tasks = await getTasks(process.env.TASKS_DATABASE_ID!);
		return NextResponse.json(tasks);
	} catch (error) {
		console.error("Error fetching tasks:", error);
		return NextResponse.json(
			{ error: "Failed to fetch tasks" },
			{ status: 500 }
		);
	}
}
