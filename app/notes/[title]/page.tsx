'use client'

import { useState, useEffect, useCallback, use } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import TipTap from "@/app/components/Tiptap";
import Utilbar from "@/app/components/Utilbar";

export default function NotePage({ params }: { params: Promise<{ title: string }> }) {
	const router = useRouter();
	const { toast } = useToast();
	const { title } = use(params);

	const [note, setNote] = useState<{ title: string; content: string } | null>(null);
	const [tempTitle, setTempTitle] = useState("");
	const [debouncedTitle] = useDebounce(tempTitle, 3000);
	const [editorContent, setEditorContent] = useState("");

	const editor = useEditor({
		extensions: [StarterKit],
		content: "",
		onUpdate: ({ editor }) => {
			setEditorContent(editor.getHTML());
		},
	});

	useEffect(() => {
		axios.get(`/api/getNotes/${title}`).then(({ data }) => {
			setNote(data);
			setTempTitle(data.title);
			editor?.commands.setContent(data.content || "");
		});
	}, [title, editor]);

	const saveContent = useCallback(async () => {
		if (!note || !editor) return;

		try {
			const response = await axios.put(`/api/updateNote`, {
				oldTitle: note.title,
				title: debouncedTitle,
				content: editorContent,
			});

			if (response.status === 200) {
				toast({ title: "Conteúdo salvo com sucesso!" });
			}
		} catch (error) {
			console.error("Erro ao salvar conteúdo:", error);
			toast({
				title: "Erro ao salvar o conteúdo.",
				description: `${error}` || "Tente novamente.",
			});
		}
	}, [note, debouncedTitle, editorContent, toast, router]);


	useEffect(() => {
		const interval = setInterval(() => {
			if (editor?.isFocused) saveContent();
		}, 5000);

		return () => clearInterval(interval);
	}, [editor?.getHTML(), saveContent]);

	useEffect(() => {
		if (!note || debouncedTitle.trim() === "" || debouncedTitle === note.title) return;

		axios
			.put(`/api/updateNote`, {
				oldTitle: title,
				title: debouncedTitle,
				content: editorContent,
			})
			.then(() => {
				setNote((prev) => (prev ? { ...prev, title: debouncedTitle } : prev));
				toast({ title: "Título atualizado!" });
				router.push(`/notes/${debouncedTitle}`);
			})
			.catch((err) => {
				console.error("Erro ao atualizar título:", err);
				toast({ title: "Erro ao atualizar título." });
			});
	}, [debouncedTitle, note?.title, title, toast, editorContent]);

	if (!note) return <div>Carregando...</div>;

	return (
		<>
			<Utilbar />
			<div className="p-6 space-y-6">
				<Input
					value={tempTitle}
					onChange={(e) => setTempTitle(e.target.value)}
					placeholder="Note Title"
					className="rounded-lg p-7 bg-neutral-800 border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-transparent !text-4xl font-bold"
				/>
				<TipTap editor={editor as any} />
				<EditorContent editor={editor} className="rounded-lg p-3 bg-neutral-800 border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-transparent" placeholder="Write something nice..."/>
			</div>
		</>
	);
}