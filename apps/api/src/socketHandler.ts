import { Server, Socket } from "socket.io";
import { MessageService } from "./services/message.service";

// Fonction pour configurer les gestionnaires de socket
export function setupSocketHandlers(io: Server) {
	io.on("connection", (socket: Socket) => {
		// Gestionnaire pour l'événement "joinRoom"
		socket.on("joinRoom", (room: string) => {
			socket.join(room);
			console.log(`User joined room: ${room}`);
		});

		// Gestionnaire pour l'événement "leaveRoom"
		socket.on("leaveRoom", (room: string) => {
			socket.leave(room);
			console.log(`User left room: ${room}`);
		});

		// Gestionnaire pour l'événement "sendMessage"
		socket.on("sendMessage", async (message) => {
			try {
				// Envoie le message à tous les clients
				io.to(message.conversation.id).emit("receiveMessage", message);
			} catch (error) {
				console.error("Error sending message:", error);
			}
		});

		// Gestionnaire pour l'événement "disconnect"
		socket.on("disconnect", () => {
			console.log("User disconnected");
		});
	});
}