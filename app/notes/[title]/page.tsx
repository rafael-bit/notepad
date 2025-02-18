'use client';

import { use, useState } from 'react';
import axios from 'axios';

export default function NotePage({ params }: { params: Promise<{ title: string }> }) {
	const { title } = use(params);
	const [note, setNote] = useState<{ title: string; content: string } | null>(null);

	useState(() => {
		axios.get(`/api/notes/${title}`).then((response) => {
			setNote(response.data);
		});
	});

	if (!note) return <div>Carregando...</div>;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">{note.title}</h1>
			<p className="mt-4">{note.content || 'Sem conteúdo ainda.'}</p>
		</div>
	);
}