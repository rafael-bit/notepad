"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";

interface PhotoSelectorProps {
	noteTitle: string;
	onPhotoSelect: (url: string) => void;
}

const fetchNoteImage = async (title: string) => {
	try {
		const response = await axios.get(`/api/getImageNote?title=${encodeURIComponent(title)}`);
		return response.data.photo_url || "";
	} catch (error) {
		console.error("Error fetching note image:", error);
		return "";
	}
};

const fetchAvailablePhotos = async () => {
	try {
		const response = await axios.get("/api/getImages");
		return Array.isArray(response.data.images) ? response.data.images : [];
	} catch (error) {
		console.error("Error fetching image:", error);
		return [];
	}
};

export default function PhotoSelector({ noteTitle, onPhotoSelect }: PhotoSelectorProps) {
	const [photos, setPhotos] = useState<string[]>([]);
	const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string>("");

	useEffect(() => {
		const loadNoteImage = async () => {
			const imageUrl = await fetchNoteImage(noteTitle);
			setCurrentPhotoUrl(imageUrl || "/placeholder.jpg");
		};

		if (noteTitle) {
			loadNoteImage();
		}
	}, [noteTitle]);

	useEffect(() => {
		const loadPhotos = async () => {
			const availablePhotos = await fetchAvailablePhotos();
			setPhotos(availablePhotos);
		};

		loadPhotos();
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="relative inline-block">
					{currentPhotoUrl ? (
						<Image
							src={currentPhotoUrl}
							alt="Current Photo"
							width={700}
							height={700}
							className="h-96 rounded-lg object-cover"
						/>
					) : (
						<div className="w-[100px] h-[100px] bg-gray-700 rounded-lg flex items-center justify-center">
							<span className="text-gray-400">No Image</span>
						</div>
					)}
					<Button variant="outline" className="absolute top-1 right-1 rounded-full px-2 py-0 shadow-lg">
						✏️
					</Button>
				</div>
			</DialogTrigger>
			<DialogContent className="p-4 bg-neutral-900 border-none">
				<DialogTitle className="text-center">Change Image</DialogTitle>
				<div className="grid grid-cols-3 gap-4 p-4">
					{photos.map((photo) => (
						<button
							key={photo}
							onClick={() => {
								onPhotoSelect(photo);
								setCurrentPhotoUrl(photo);
							}}
							className={`border-2 rounded-lg ${currentPhotoUrl === photo ? "border-blue-500" : "border-transparent"}`}
						>
							<Image
								src={photo}
								alt="Photo"
								width={100}
								height={100}
								className="rounded-lg object-cover"
							/>
						</button>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}