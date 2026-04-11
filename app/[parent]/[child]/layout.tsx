import { notFound } from "next/navigation";
import { NoteAside } from "@/components/NoteAside";
import { isValidNoteId } from "@/lib/note-id";

type Props = {
  children: React.ReactNode;
  params: Promise<{ parent: string; child: string }>;
};

export default async function NoteChildLayout({ children, params }: Props) {
  const { parent, child } = await params;
  if (!isValidNoteId(parent) || !isValidNoteId(child)) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <NoteAside parentId={parent} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
