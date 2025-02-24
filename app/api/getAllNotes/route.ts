import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
	try {
		const allNotes = await db.select().from(notes).orderBy(desc(notes.createdAt));
		return NextResponse.json(allNotes, { status: 200 });
	} catch (error) {
		console.error("Error fetching notes:", error);
		return NextResponse.json({ message: "Error fetching notes" }, { status: 500 });
	}
}
