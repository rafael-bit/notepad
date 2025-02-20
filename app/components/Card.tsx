import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Note = {
	id: number;
	title: string;
	content: string | null;
	photoUrl: string | null;
	createdAt: string;
};

type Props = {
	note: Note;
};

export default function NoteCard({ note }: Props) {
	const router = useRouter();
	const titleLowerCase = note.title.toLowerCase();

	return (
		<Card
			onClick={() => router.push(`/notes/${titleLowerCase}`)}
			className="cursor-pointer  transition-all duration-200 flex w-full bg-neutral-800 border-none rounded-lg"
		>
			{note.photoUrl && (
				<Image
					src={note.photoUrl}
					alt={note.title}
					className="w-32 h-32 object-cover rounded-l-lg"
				/>
			)}
			<CardContent className="flex flex-col justify-between p-4 w-full">
				<div>
					<h3 className="text-lg font-bold truncate text-neutral-200">{note.title}</h3>
					<p className="text-sm text-neutral-400 mb-2">
						{format(new Date(note.createdAt), "dd/MM/yyyy HH:mm")}
					</p>
					<p className="text-sm text-neutral-300 line-clamp-2">
						{note.content}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}