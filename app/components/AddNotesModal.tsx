'use client'

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from 'axios'
import { FiPlus } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast"

export default function AddNotesModal() {
	const { toast } = useToast()
	const [input, setInput] = useState("");
	
	const createNotes = useMutation({
		mutationFn: async () => {
			const response = await axios.post('/api/createNotes', {
				prompt: input
			})
			return response.data
		}
	})
	
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (input.trim() === "") {
			toast({
				title: "Create a title",
				description: "Before you finish, you need to create a title.",
			});
			return;
		}

		createNotes.mutate(undefined, {
			onSuccess: () => {
				toast({
					title: "Success",
					description: "Congratulations, you created a new note!",
				});
			},
			onError: (err) => {
				console.error("Error creating note:", err);
				toast({
					title: "Sorry",
					description: "There's a problem in the system. Try again later.",
				});
			},
		});
	};

	return (
		<>
			<Dialog>
				<DialogTrigger className="fixed right-5 sm:right-16 bottom-10 bg-gradient-to-r from-blue to-greenMedium rounded-full p-3"><FiPlus className="text-3xl" /></DialogTrigger>
				<DialogContent className="bg-neutral-900 border-none">
					<DialogHeader>
						<DialogTitle className="text-neutral-200 text-center">Create a new note</DialogTitle>
						<DialogDescription className="text-neutral-400 text-center text-sm">
							You can start writing your title here
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleSubmit}>
						<Input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className="bg-neutral-800 border-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-transparent"
							placeholder="Title..."
						/>
						<div className="flex items-center gap-5 mt-7">
							<Button type="reset" className="p-2 px-4 bg-red-600 hover:bg-red-700 transition-all duration-300">Clear</Button>
							<Button type="submit" className="p-2 px-4 bg-greenMedium hover:bg-green transition-all duration-300">Create</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</>
	)
}
