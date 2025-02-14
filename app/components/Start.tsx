import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Start() {
	return (
		<section className="mt-10 w-full container mx-auto flex flex-col items-center">
			<div className="w-[90%] flex flex-col items-center p-16 rounded-lg bg-gradient-to-r from-green via-greenMedium to-blueLight">
				<h1 className="text-5xl font-bold text-neutral-200">Take note with us !</h1>
				<p className="w-full sm:w-[60%] text-center mt-3 text-neutral-300">Enhance your notes with us and unlock your full potential, making every day more organized, productive, and impactful!</p>
				<Button className="mt-7 overflow-hidden rounded-full bg-neutral-900 px-7 py-[0.875rem] transition-all duration-300 hover:bg-neutral-800 hover:text-white hover:opacity-90 flex items-end pt-[2.4rem]">
					<Image
						src={'/logo.png'}
						alt="logo"
						width={30}
						height={30}
					/>
					Get Started with your notes
				</Button>
			</div>
		</section>
	)
}
