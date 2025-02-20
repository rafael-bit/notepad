'use client'

import UpBar from '../components/UpBar';
import NoteCard from '../components/Card';
import AddNotesModal from '../components/AddNotesModal';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Note = {
	id: number;
	title: string;
	content: string | null;
	photoUrl: string | null;
	createdAt: string;
};

const formatTitle = (title: string) => {
	return title.charAt(0).toUpperCase() + title.slice(1);
};

export default function Dashboard() {
	const [notes, setNotes] = useState<Note[]>([]);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const { data } = await axios.get('/api/getAllNotes');
				const formattedNotes = data.map((note: Note) => ({
					...note,
					title: formatTitle(note.title),
				}));
				setNotes(formattedNotes);
			} catch (error) {
				console.error('Erro ao buscar notas:', error);
			}
		};

		fetchNotes();
	}, []);

	return (
		<>
			<UpBar />
			<div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{notes.length > 0 ? (
					notes.map((note) => <NoteCard key={note.id} note={note} />)
				) : (
					<p className="text-center text-neutral-400 col-span-full">Not found notes.</p>
				)}
			</div>
			<AddNotesModal />
		</>
	);
}
