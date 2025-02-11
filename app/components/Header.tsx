'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { usePathname } from 'next/navigation'
import { links } from "../constants/navlinks";

export default function Header() {
	const pathname = usePathname()
	const router = useRouter();

	const isActive = (href: string) => pathname === href;

	return (
		<div className="container mx-auto px-4 md:px-6 lg:px-8">
			<header className="flex h-20 w-full justify-between items-center px-4 md:px-6">
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
				<div className="hidden md:flex justify-center flex-1 gap-2">
					{links.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 text-neutral-200 hover:text-white  hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${isActive(href) ? "shadow-[0_0_15px_rgba(255,255,255,0.5)]" : ""
								} focus:outline-none disabled:pointer-events-none disabled:opacity-50`}
						>
							{label}
						</Link>
					))}
				</div>
				<div className="hidden md:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue to-greenMedium p-[2px] font-semibold text-white no-underline">
					<Button
						onClick={() => router.push('/sign-in')}
						className="w-full rounded-full bg-neutral-900 px-7 py-[0.875rem] text-center transition-all duration-300 hover:bg-neutral-800 hover:text-white hover:opacity-90"
					>
						Sign in
					</Button>
				</div>
				<div className="md:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon">
								<Menu className="!w-7 !h-7 text-neutral-200" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-64 bg-neutral-900 text-white">
							<DialogTitle className="sr-only">Notepad Menu</DialogTitle>
							<div className="p-4 space-y-4">
								{links.map(({ href, label }) => (
									<div
										key={href}
										className="w-full inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue to-greenMedium p-[2px] font-semibold text-white no-underline"
									>
										<Link
											href={href}
											className="block h-9 w-full bg-neutral-900 justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors text-neutral-200 hover:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50"
										>
											{label}
										</Link>
									</div>
								))}
								<Button
									onClick={() => router.push('/sign-in')}
									className="w-full rounded-full bg-gradient-to-r from-blue to-greenMedium py-2 transition hover:opacity-90"
								>
									Sign in
								</Button>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</header>
		</div>
	)
}
