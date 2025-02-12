'use client'

import Link from "next/link";
import { MdArrowForward, MdClose } from "react-icons/md";
import { useState } from "react";

export default function Banner() {
	const [showBanner, setShowBanner] = useState(true);

	return (
		showBanner && (
			<div className="w-full h-12 bg-gradient-to-r from-green via-blueLight to-greenMedium flex items-center justify-center">
				<MdClose className="absolute translate-y-0 right-5 cursor-pointer" size={20} onClick={() => setShowBanner(false)} />
				<p className="flex">Unique opportunities! Take advantage of our exclusive offers waiting for you!<Link href="/plans" className="flex items-center gap-1 under">&nbsp; <span className="underline">Click Here</span><MdArrowForward /></Link></p>
			</div>
		)
	)
}
