import { Server, Socket } from "socket.io";
import { MessageService } from "./services/message.service";

const messageService = new MessageService();

export function setupSocketHandlers(io: Server) {
	io.on("connection", (socket: Socket) => {
		// console.log("A user connected");

		// événement rejoindre une room
		socket.on("joinRoom", (room: string) => {
			socket.join(room);
			console.log(`User joined room: ${room}`);
		});

		// événement quitter une room
		socket.on("leaveRoom", (room: string) => {
			socket.leave(room);
			console.log(`User left room: ${room}`);
		});

		// événement envoi de message
		// socket.on(
		// 	"sendMessage",
		// 	async (message: {
		// 		room: string;
		// 		content: string;
		// 		senderId: number;
		// 	}) => {
		// 		try {
		// 			const newMessage = await messageService.createMessage(
		// 				message.room,
		// 				message.senderId.toString(),
		// 				message.content,
		// 			);
		// 			io.to(message.room).emit("receiveMessage", newMessage);
		// 			console.log(
		// 				`Message sent to room ${message.room}: ${message.content}`,
		// 			);
		// 		} catch (error) {
		// 			console.error("Error sending message:", error);
		// 		}

		// 	},
		// );

		socket.on("sendMessage", async (message) => {
			try {
				// Diffusion du message reçu sans le créer à nouveau
				io.to(message.conversation.id).emit("receiveMessage", message);
				// console.log(
				// 	`Message broadcasté dans la room ${message.conversation}`,
				// );
			} catch (error) {
				console.error("Error sending message:", error);
			}
		});

		socket.on("disconnect", () => {
			// console.log("A user disconnected");
		});
	});
}
