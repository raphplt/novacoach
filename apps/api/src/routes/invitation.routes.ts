import { Router } from "express";
import { InvitationController } from "../controllers/invitation.controller";

const router = Router();
const invitationController = new InvitationController();

router.post("/invitations/generate", (req, res) =>
	invitationController.generateInvitationLink(req, res),
);

router.post("/invitations/accept", (req, res) =>
	invitationController.acceptInvitation(req, res),
);

router.get("/invitations/coach/:coachId", (req, res) =>
	invitationController.getInvitationsByCoach(req, res),
);
router.get("/invitations/user/:userId", (req, res) =>
	invitationController.getInvitationsByUser(req, res),
);

export default router;