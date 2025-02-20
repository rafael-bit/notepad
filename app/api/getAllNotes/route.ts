import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
	try {
		const allNotes = await db.select().from(notes).orderBy(desc(notes.createdAt));
		return NextResponse.json(allNotes, { status: 200 });
	} catch (error) {
		console.error("Erro ao buscar notas:", error);
		return NextResponse.json({ message: "Erro ao buscar notas" }, { status: 500 });
	}
}
