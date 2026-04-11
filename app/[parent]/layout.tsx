import { notFound } from "next/navigation";
import { NoteAside } from "@/components/NoteAside";
import { listChildSlugs } from "@/lib/db";
import { isValidNoteId } from "@/lib/note-id";

/** Lista de subpáginas muda após gravar — não cachear o shell com/sem aside. */
export const dynamic = "force-dynamic";

type Props = {
  children: React.ReactNode;
  params: Promise<{ parent: string }>;
};

export default async function NoteParentLayout({ children, params }: Props) {
  const { parent } = await params;
  if (!isValidNoteId(parent)) {
    notFound();
  }

  const hasSubpages = listChildSlugs(parent).length > 0;

  if (!hasSubpages) {
    return children;
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <NoteAside parentId={parent} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
