import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { MdArrowBack } from 'react-icons/md';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { Trash } from 'lucide-react';

export default function Utilbar() {
	const router = useRouter();
	const pathname = usePathname();
	const { user } = useUser();

	const formatTitle = (path: string) => {
		const segments = path.split('/').filter(Boolean);
		const lastSegment = segments[segments.length - 1] || 'dashboard';
		return lastSegment
			.replace(/-/g, ' ')
			.replace(/\b\w/g, c => c.toUpperCase());
	};

	const title = formatTitle(pathname);
	const noteId = pathname.split("/").pop()

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/notes/${noteId}`);
			toast({
				title: "Success",
				description: "Success, you have deleted a note!",
			});
		} catch (error) {
			console.error('Error deleting note:', error);
			toast({
				title: "Error",
				description: "A system problem occurred. Please try again later.",
			});
		}
	};

	return (
		<>
			<header className="container mx-auto w-full flex items-center justify-between py-10 px-5 sm:px-0">
				<div className="flex items-end gap-5">
					<Button
						onClick={() => router.push('/dashboard')}
						className="rounded-lg bg-gradient-to-r from-blue to-greenMedium py-2 flex items-center gap-2 transition hover:opacity-90"
					>
						<MdArrowBack size={20} />
						Back
					</Button>
				</div>
				<div className="flex items-center gap-10">
					{user && (
						<div className="text-sm text-neutral-300 flex items-center cursor-pointer">
							<p className='font-semibold'>{user.firstName} {user.lastName}</p> &nbsp;/&nbsp; <p className="">{title}</p>
						</div>
					)}
					{noteId && (
						<Button
							onClick={handleDelete}
							variant="destructive"
							className="rounded-lg py-2 flex items-center gap-2 transition hover:opacity-90"
						>
							<Trash size={20} />
						</Button>
					)}
				</div>
			</header>
			<div className="mx-auto w-[90%] h-[1px] bg-neutral-700 mt-5 mb-10"></div>
		</>
	);
}