import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export default function UpBar() {
	return (
		<>
			<header className="container mx-auto w-full flex items-center justify-between py-10">
				<div className="flex items-end gap-5">
					<Button className="rounded-lg bg-gradient-to-r from-blue to-greenMedium py-2 transition hover:opacity-90"><MdArrowBack /> Back</Button>
					<Link href="#" className="pr-6 flex items-end">
						<Image
							src={'/logo.png'}
							alt="logo"
							width={40}
							height={40}
						/>
						<h1 className="text-xl font-bold">Notepad</h1>
						<span className="sr-only">Notepad</span>
					</Link>
				</div>
				<div className="flex items-center gap-5">
					<h3 className="text-lg font-bold">My Notes</h3>
					<UserButton />
				</div>
			</header>
			<div className="mx-auto w-[90%] h-[1px] bg-neutral-700 mt-5 mb-10"></div>
		</>
	)
}
