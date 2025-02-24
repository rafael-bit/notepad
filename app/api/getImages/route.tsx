import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
	const imagesDirectory = path.join(process.cwd(), "public/images");

	try {
		const files = fs.readdirSync(imagesDirectory);
		const images = files
			.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file))
			.map(file => `/images/${file}`);

		return NextResponse.json({ images });
	} catch (error) {
		console.error("Failed to read images:", error);
		return NextResponse.json({ error: "Failed to load images" }, { status: 500 });
	}
}