import { Router } from "express";
import { UserHasMessageController } from "../controllers/userHasMessages.controller";

const router = Router();
const userHasMessageController = new UserHasMessageController();

router.get("/user-messages", (req, res) => userHasMessageController.getAllUserMessages(req, res));
router.get("/user-messages/:id", (req, res) => userHasMessageController.getUserMessageById(req, res));
router.post("/user-messages", (req, res) => userHasMessageController.createUserMessage(req, res));
router.put("/user-messages/:id", (req, res) => userHasMessageController.updateUserMessage(req, res));
router.delete("/user-messages/:id", (req, res) => userHasMessageController.deleteUserMessage(req, res));

export default router;