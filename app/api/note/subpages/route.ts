import { NextResponse } from "next/server";
import { listChildSlugs } from "@/lib/db";
import { isValidNoteId } from "@/lib/note-id";

export async function GET(request: Request) {
  const parent = new URL(request.url).searchParams.get("parent");
  if (!parent || !isValidNoteId(parent)) {
    return NextResponse.json({ error: "Invalid parent" }, { status: 400 });
  }
  const slugs = listChildSlugs(parent);
  return NextResponse.json({ slugs });
}
