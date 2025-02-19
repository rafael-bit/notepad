import { Editor } from "@tiptap/react";
import { Bold, Italic, Strikethrough, Code } from "lucide-react";

type Props = {
	editor: Editor;
};

const TipTap = ({ editor }: Props) => {
	return (
		<div className="flex flex-wrap gap-2">
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				className={editor.isActive("bold") ? "is-active" : ""}
			>
				<Bold className="w-6 h-6" />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				className={editor.isActive("italic") ? "is-active" : ""}
			>
				<Italic className="w-6 h-6" />
			</button>
			
			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				className={editor.isActive("strike") ? "is-active" : ""}
			>
				<Strikethrough className="w-6 h-6" />
			</button>

			<button
				onClick={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				className={editor.isActive("code") ? "is-active" : ""}
			>
				<Code className="w-6 h-6" />
			</button>
		</div>
	);
};

export default TipTap;
