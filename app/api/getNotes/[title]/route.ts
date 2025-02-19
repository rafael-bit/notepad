import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { notes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest, { params }: { params: { title: string } }) {
	const note = await db.select().from(notes).where(eq(notes.title, params.title)).limit(1);

	if (note.length === 0) {
		return NextResponse.json({ error: 'Note not found' }, { status: 404 });
	}

	return NextResponse.json({ title: note[0].title, content: note[0].content });
}