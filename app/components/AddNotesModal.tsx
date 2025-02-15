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
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function AddNotesModal() {
	const [ input, setInput ] = useState("");

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
					<form action="">
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
