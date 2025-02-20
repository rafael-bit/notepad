import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { title: string } }
) {
	const title = params.title;

	try {
		const deletedNote = await db
			.delete(notes)
			.where(eq(notes.title, title))
			.returning();

		if (!deletedNote || deletedNote.length === 0) {
			return NextResponse.json({ error: "Note not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error deleting note:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}