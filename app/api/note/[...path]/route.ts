import { NextResponse } from "next/server";
import { getNote, upsertNote } from "@/lib/db";
import { isValidNotePathSegments, segmentsToNoteId } from "@/lib/note-id";

type RouteContext = { params: Promise<{ path: string[] }> };

function resolveId(path: string[]) {
  if (!isValidNotePathSegments(path)) return null;
  return segmentsToNoteId(path);
}

export async function GET(_request: Request, context: RouteContext) {
  const { path } = await context.params;
  const id = resolveId(path);
  if (!id) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  const row = getNote(id);
  if (!row) {
    return NextResponse.json({
      id,
      content: "",
      updatedAt: null as number | null,
    });
  }
  return NextResponse.json({
    id: row.id,
    content: row.content,
    updatedAt: row.updatedAt,
  });
}

export async function PUT(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const id = resolveId(path);
  if (!id) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (
    typeof body !== "object" ||
    body === null ||
    typeof (body as { content?: unknown }).content !== "string"
  ) {
    return NextResponse.json({ error: "Expected { content: string }" }, { status: 400 });
  }
  const content = (body as { content: string }).content;
  const row = upsertNote(id, content);
  return NextResponse.json({
    id: row.id,
    content: row.content,
    updatedAt: row.updatedAt,
  });
}
