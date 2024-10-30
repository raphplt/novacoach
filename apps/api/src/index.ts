import "reflect-metadata";
import { AppDataSource } from "../ormconfig";
import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocketHandlers } from "./socketHandler";


const port = process.env.PORT || 3002;

const server = createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

// gestion des sockets
setupSocketHandlers(io);

AppDataSource.initialize()
	.then(() => {
		server.listen(port, () => {
			console.log(`Server is running on port ${port} 🚀`);
		});
	})
	.catch((error) => console.log(error));