"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function MessageList({
	messages,
	sendMessage,
	userId,
}: {
	messages: any[];
	sendMessage: (content: string, file?: File | null) => void;
	userId: number | undefined;
}) {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	// Trier les messages par date d'envoi
	const sortedMessages =
		messages &&
		messages.sort(
			(a, b) =>
				new Date(a.sendDate).getTime() - new Date(b.sendDate).getTime(),
		);

	const handleImageClick = (imageUrl: string) => {
		setEnlargedImage(imageUrl);
	};

	const handleCloseImage = () => {
		setEnlargedImage(null);
	};

	return (
		<>
			{sortedMessages && sortedMessages.length > 0 && (
				<div className="flex flex-col space-y-2 mx-auto mb-12">
					{sortedMessages.map((message: any) => (
						<div
							key={message.idMessage}
							className={`${
								message.sender.id === userId
									? "self-end"
									: "self-start"
							}
							max-w-[70%] p-1
							`}
						>
							<div className="bg-gray-200 p-2 rounded-md">
								{message.content}

								{message.fileUrl &&
									(message.fileUrl.endsWith(".mp4") ||
									message.fileUrl.endsWith(".mov") ? (
										<video
											width={500}
											height={500}
											src={message.fileUrl}
											controls
											className="max-w-2/3 h-fit"
										/>
									) : (
										<Image
											width={200}
											height={200}
											src={message.fileUrl}
											alt="file"
											className="max-w-1/2 h-fit cursor-pointer"
											onClick={() =>
												handleImageClick(
													message.fileUrl,
												)
											}
										/>
									))}
							</div>

							<p className="text-xs text-gray-500">
								{new Date(message.sendDate).toLocaleTimeString(
									[],
									{ hour: "2-digit", minute: "2-digit" },
								)}
							</p>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>
			)}
			<div className="w-[95%] flex flex-row mx-auto border border-gray-300 bg-gray-50 rounded-md bottom-3 right-0 left-0 absolute focus:outline-none focus:ring-0">
				<input
					type="text"
					placeholder="Envoyer un message"
					className="w-full p-2 focus:outline-none focus:ring-0 bg-transparent"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							sendMessage(e.currentTarget.value, selectedFile);
							e.currentTarget.value = "";
							setSelectedFile(null);
						}
					}}
				/>
				<input
					type="file"
					onChange={(e) => {
						if (e.target.files && e.target.files[0]) {
							setSelectedFile(e.target.files[0]);
						}
					}}
					className="hidden"
					id="file-input"
				/>
				{selectedFile && (
					<div className="p-2 bg-gray-200 rounded-md">
						{selectedFile.name}
					</div>
				)}
				<label
					htmlFor="file-input"
					className="mx-1 hover:scale-105 p-2 rounded-md cursor-pointer"
				>
					<Icon
						icon="material-symbols:attach-file"
						width={24}
						height={24}
						color="#134074"
					/>
				</label>
				<button
					onClick={() => {
						const input = document.querySelector(
							"input[type='text']",
						) as HTMLInputElement;
						sendMessage(input.value, selectedFile);
						input.value = "";
						setSelectedFile(null);
					}}
					className="mx-1 hover:scale-105 p-2 rounded-md"
				>
					<Icon
						icon="material-symbols:send"
						width={24}
						height={24}
						color="#134074"
					/>
				</button>
			</div>
			{enlargedImage && (
				<div
					className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
					onClick={handleCloseImage}
				>
					<Image
						src={enlargedImage}
						alt="Enlarged file"
						width={800}
						height={800}
						className="max-w-full max-h-full"
					/>
				</div>
			)}
		</>
	);
}