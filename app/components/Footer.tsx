import {
	Footer,
	FooterColumn,
	FooterBottom,
	FooterContent,
} from "@/components/ui/footer";
import Image from "next/image";
import Link from "next/link";
import { links, socials, technologies } from "../constants/navlinks";

export default function FooterSection() {
	return (
		<footer className="w-full flex bg-neutral-900 px-9 md:px-4">
			<div className="mx-auto container">
				<Footer className="bg-neutral-900">
					<FooterContent className="justify-center">
						<FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1 items-center">
							<div className="w-full lg:pl-7 flex md:flex-col items-center md:items-start justify-center xs:justify-between md:justify-center gap-2">
								<div className="flex items-end">
									<Image
										src={'/logo.png'}
										alt="logo"
										width={40}
										height={40}
									/>
									<h3 className="text-xl font-bold text-neutral-200">Notepad</h3>
								</div>
								<p className="text-sm text-neutral-200 hidden xs:block">© {new Date().getFullYear()} Notepad. All rights reserved</p>
							</div>
						</FooterColumn>
						<FooterColumn className="hidden md:grid">
							<h3 className="text-md pt-1 font-semibold text-white">Pages</h3>
							{links.map(({ href, label }) => (
								<Link
									key={href}
									href={href}
									className="text-sm text-neutral-200 hover:text-white hover:underline"
								>
									{label}
								</Link>
							))}
						</FooterColumn>
						<FooterColumn className="hidden md:grid">
							<h3 className="text-md pt-1 font-semibold text-white">Technologies</h3>
							{technologies.map(({ href, label }) => (
								<Link
									key={href}
									href="/"
									className="text-sm text-neutral-200 hover:text-white hover:underline"
								>
									{label}
								</Link >
							))}
							
						</FooterColumn>
						<FooterColumn className="hidden md:grid">
							<h3 className="text-md pt-1 font-semibold text-white">Links</h3>
							{socials.map(({ href, label }) => (
								<Link
									key={href}
									href={href}
									className="text-sm text-neutral-200 hover:text-white hover:underline"
								>
									{label}
								</Link >
							))}
						</FooterColumn>
					</FooterContent>
					<FooterBottom>
						<div className="flex items-center gap-4">
							<Link href="/">Privacy Policy</Link >
							<Link href="/">Terms of Service</Link >
						</div>
					</FooterBottom>
				</Footer>
			</div>
		</footer>
	);
}
