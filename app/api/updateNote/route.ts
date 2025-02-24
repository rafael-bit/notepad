import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest) {
	try {
		const { oldTitle, title, content, photoUrl } = await req.json();

		const updatedNote = await db
			.update(notes)
			.set({
				title,
				content,
				photoUrl,
			})
			.where(eq(notes.title, oldTitle))
			.returning();

		if (updatedNote.length === 0) {
			return NextResponse.json({ message: "Nota não encontrada" }, { status: 404 });
		}

		return NextResponse.json(updatedNote[0], { status: 200 });
	} catch (error) {
		console.error("Erro ao atualizar a nota:", error);
		return NextResponse.json({ message: "Erro ao atualizar a nota" }, { status: 500 });
	}
}