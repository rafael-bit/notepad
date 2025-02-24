"use client";

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
import PhotoSelector from "@/app/components/PhotoSelector";

export default function NotePage({ params }: { params: Promise<{ title: string }> }) {
	const router = useRouter();
	const { toast } = useToast();
	const { title } = use(params);

	const [note, setNote] = useState<{ title: string; content: string; photoUrl: string } | null>(null);
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
		}).catch((err) => {
			console.error("Failed to fetch note:", err);
			toast({ title: "Failed to load note." });
		});
	}, [title, editor, toast]);

	const saveContent = useCallback(async () => {
		if (!note || !editor) return;

		try {
			const response = await axios.put("/api/updateNote", {
				oldTitle: note.title,
				title: debouncedTitle,
				content: editorContent,
				photoUrl: note.photoUrl,
			});

			if (response.status === 200) {
				toast({ title: "Content saved successfully!" });
			}
		} catch (error) {
			console.error("Failed to save content:", error);
			toast({ title: "Failed to save content." });
		}
	}, [note, debouncedTitle, editorContent, toast, editor]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (editor?.isFocused) saveContent();
		}, 3000);

		return () => clearInterval(interval);
	}, [saveContent, editor?.isFocused]);

	useEffect(() => {
		if (!note || debouncedTitle.trim() === "" || debouncedTitle === note.title) return;

		axios.put("/api/updateNote", {
			oldTitle: title,
			title: debouncedTitle,
			content: editorContent,
			photoUrl: note.photoUrl,
		}).then(() => {
			setNote((prev) => (prev ? { ...prev, title: debouncedTitle } : prev));
			toast({ title: "Title updated!" });
			router.push(`/notes/${debouncedTitle}`);
		}).catch((err) => {
			console.error("Failed to update title:", err);
			toast({ title: "Failed to update title." });
		});
	}, [debouncedTitle, note, router, title, toast, editorContent]);

	const handlePhotoSelect = (url: string) => {
		setNote((prev) => (prev ? { ...prev, photoUrl: url } : prev));
		toast({ title: "Photo updated!" });
	};

	if (!note) return <div>Loading...</div>;

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
				<PhotoSelector noteTitle={title} onPhotoSelect={handlePhotoSelect} />
				{editor && <TipTap editor={editor} />}
				<EditorContent
					editor={editor}
					className="rounded-lg p-3 bg-neutral-800 border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-transparent"
					placeholder="Write something nice..."
				/>
			</div>
		</>
	);
}