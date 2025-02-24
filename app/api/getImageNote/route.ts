import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { notes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
	try {
		const title = req.nextUrl.searchParams.get('title');

		if (!title) {
			return NextResponse.json({ error: 'Note title not provided' }, { status: 400 });
		}

		const result = await db
			.select({ photo_url: notes.photoUrl })
			.from(notes)
			.where(eq(notes.title, title));

		if (result.length === 0) {
			return NextResponse.json({ error: 'Note not found' }, { status: 404 });
		}

		return NextResponse.json({ photo_url: result[0].photo_url });
	} catch (error) {
		console.error('Error fetching note image:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}