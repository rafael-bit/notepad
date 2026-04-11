import { NoteEditor } from "@/components/NoteEditor";

type Props = { params: Promise<{ parent: string; child: string }> };

export default async function ChildNotePage({ params }: Props) {
  const { parent, child } = await params;
  return <NoteEditor noteId={`${parent}/${child}`} />;
}
