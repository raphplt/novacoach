import { Router } from "express";
import multer from "multer";
import { storage } from "../cloudinaryConfig";
import { MessageController } from "../controllers/message.controller";

const router = Router();
const upload = multer({ storage });

const messageController = new MessageController();

router.get("/messages", (req, res) =>
	messageController.getAllMessages(req, res),
);

router.get("/messages/:id", (req, res) =>
	messageController.getMessageById(req, res),
);

// router.post("/messages", (req, res) =>
// 	messageController.createMessage(req, res),
// );

router.post("/messages", upload.single("file"), (req, res) =>
	messageController.createMessage(req, res),
);

router.put("/messages/:id", (req, res) =>
	messageController.updateMessage(req, res),
);

router.delete("/messages/:id", (req, res) => messageController.deleteMessage(req, res));

export default router;