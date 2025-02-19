import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { notes } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
	const { title } = await request.json();

	const newNote = await db.insert(notes).values({ title }).returning();

	if (newNote.length === 0) {
		return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
	}

	const createdNote = newNote[0];

	return NextResponse.json({ title: createdNote.title });
}