import { Request, Response } from "express";
import { InvitationService } from "../services/invitation.service";

export class InvitationController {
	private invitationService = new InvitationService();

	async generateInvitationLink(req: Request, res: Response): Promise<void> {
		try {
			const { coachId, studentEmail } = req.body;
			const link = await this.invitationService.generateInvitationLink(
				coachId,
				studentEmail,
			);
			res.status(200).json({ link });
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async acceptInvitation(req: Request, res: Response): Promise<void> {
		try {
			const { token, studentId } = req.body;
			await this.invitationService.acceptInvitation(token, studentId);
			res.status(200).json({ message: "Invitation accepted" });
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getInvitationsByCoach(req: Request, res: Response): Promise<void> {
		try {
			const { coachId } = req.params;
			const invitations =
				await this.invitationService.getInvitationsByCoach(
					Number(coachId),
				);
			res.status(200).json({ invitations });
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getInvitationsByUser(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.params;
			const invitations =
				await this.invitationService.getInvitationsByUser(
					Number(userId),
				);
			res.status(200).json({ invitations });
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}