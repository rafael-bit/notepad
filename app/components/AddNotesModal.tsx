'use client';

import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function AddNotesModal() {
	const router = useRouter();
	const { toast } = useToast();
	const [input, setInput] = useState("");
	const [images, setImages] = useState<string[]>([]);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	useEffect(() => {
		axios.get('/api/getImages')
			.then(res => setImages(res.data.images))
			.catch(err => console.error("Failed to fetch images:", err));
	}, []);

	const createNotes = useMutation({
		mutationFn: async () => {
			const response = await axios.post('/api/createNotes', {
				title: input,
				photoUrl: selectedImage,
			});
			return response.data;
		}
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (input.trim() === "") {
			toast({ title: "Create a title", description: "Before you finish, you need to create a title." });
			return;
		}

		createNotes.mutate(undefined, {
			onSuccess: (data) => {
				toast({ title: "Success", description: "Note created successfully!" });
				setInput("");
				setSelectedImage(null);
				router.push(`/notes/${encodeURIComponent(data.title)}`);
			},
			onError: () => {
				toast({ title: "Ops", description: "An error occurred. Please try again." });
			},
		});
	};

	return (
		<Dialog>
			<DialogTrigger className="fixed right-10 bottom-10 bg-gradient-to-r from-blue to-greenMedium rounded-full p-3">
				<FiPlus className="text-3xl" />
			</DialogTrigger>
			<DialogContent className="bg-neutral-900 border-none">
				<DialogHeader>
					<DialogTitle className="text-neutral-200 text-center">
						Create a new note
					</DialogTitle>
					<DialogDescription className="text-neutral-400 text-center text-sm">
						Enter the note title below
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<Input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="bg-neutral-800 border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-transparent"
						placeholder="Title..."
					/>
					<div className="mt-6">
						<h3 className="text-neutral-300 text-sm mb-2">Choose an image: </h3>
						<div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto">
							{images.map((img) => (
								<div
									key={img}
									onClick={() => setSelectedImage(img)}
									className={`rounded-lg cursor-pointer overflow-hidden border-2 transition-all ${selectedImage === img ? "border-greenMedium" : "border-transparent"
										}`}
								>
									<Image src={img} alt="Note" className="w-full h-24 object-cover" width={200} height={200} />
								</div>
							))}
						</div>
					</div>
					<div className="flex items-center gap-5 mt-7">
						<Button
							type="reset"
							className="p-2 px-4 bg-red-600 hover:bg-red-700 transition-all duration-300"
						>
							Clear
						</Button>
						<Button
							type="submit"
							className="p-2 px-4 bg-greenMedium hover:bg-green transition-all duration-300"
						>
							Create
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}