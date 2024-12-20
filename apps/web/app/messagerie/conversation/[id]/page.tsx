"use client";

import useFetchData from "@hooks/useFetchData";
import { useAuth } from "contexts/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import PageLoader from "@components/Common/Loaders/PageLoader";
import SideBar from "../SideBar";
import MessageList from "./MessageList";
import { MessageType } from "type/conversation";
import { Avatar } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";

const url = process.env.NEXT_PUBLIC_API_URL;
const socketUrl = process.env.NEXT_PUBLIC_API_SOCKET_URL;

export default function Conversation() {
	const socket = io(socketUrl);
	const { user } = useAuth();
	const params = useParams();
	const router = useRouter();
	const { id } = params;

	const userId = user?.id;
	const otherUserId = id;

	const {
		data: convData,
		isLoading,
		isError,
	} = useFetchData({
		url: `/conversations/getOrCreate`,
		method: "POST",
		body: {
			user1Id: Number(userId),
			user2Id: Number(otherUserId),
		},
		enabled: !!userId && !!otherUserId,
	});

	const otherUser = convData?.data?.participants.find(
		(p: any) => p.id !== userId,
	);

	const [messages, setMessages] = useState<MessageType[]>([]);

	// Gestion des messages avec socket.io
	useEffect(() => {
		if (convData) {
			setMessages(convData.data.messages);
			socket.emit("joinRoom", convData.data.id);
		}

		socket.on("receiveMessage", (message) => {
			setMessages((prevMessages: MessageType[]) => {
				if (!Array.isArray(prevMessages)) {
					prevMessages = [];
				}
				return [...prevMessages, message] as MessageType[];
			});
		});

		return () => {
			if (convData) {
				socket.emit("leaveRoom", convData.data.id);
				socket.off("receiveMessage");
			}
		};
	}, [convData]);

	if (isLoading) {
		return <PageLoader text="Chargement de la conversation" />;
	}

	if (isError) {
		return <div>Erreur lors du chargement de la conversation</div>;
	}

	// Fonction pour envoyer un message
	const sendMessage = (content: string, file?: File | null) => {
		const formData = new FormData();
		formData.append("content", content);
		formData.append("room", convData?.data.id);
		formData.append("senderId", String(userId));

		if (file) {
			formData.append("file", file);
		}

		fetch(`${url}/messages`, {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				socket.emit("sendMessage", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="h-screen pt-12 flex overflow-hidden">
			<SideBar />
			<div className="flex-1 flex flex-col relative overflow-hidden">
				<div className="flex flex-row items-center justify-between gap-2 w-full px-5">
					<button
						onClick={() =>
							router.push(
								`/coach/dashboard/students/profil/${otherUserId}`,
							)
						}
						className="text-xl font-bold text-center text-gray-900 my-2 flex flex-row items-center gap-2 hover:bg-slate-100 rounded-xl px-2 py-1"
					>
						{otherUser?.profileImageUrl ? (
							<Avatar
								src={otherUser?.profileImageUrl}
								alt="profile"
							/>
						) : (
							<Icon
								icon="bi:person-circle"
								width={50}
								height={50}
							/>
						)}
						{otherUser?.firstName} {otherUser?.lastName}
					</button>
				</div>

				<div className="w-full py-5 mx-auto bg-gray-100 p-5 rounded-xl h-full overflow-y-auto">
					<MessageList
						messages={messages}
						sendMessage={sendMessage}
						userId={userId}
					/>
				</div>
			</div>
		</div>
	);
}
