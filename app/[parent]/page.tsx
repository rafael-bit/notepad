import { NoteEditor } from "@/components/NoteEditor";

type Props = { params: Promise<{ parent: string }> };

export default async function ParentNotePage({ params }: Props) {
  const { parent } = await params;
  return <NoteEditor noteId={parent} />;
}
