import { SessionBookingService } from "../services/sessionBooking.service";
import { Request, Response } from "express";

export class SessionBookingController {
	private sessionBookingService = new SessionBookingService();

	async getAllSessionBookings(req: Request, res: Response): Promise<void> {
		try {
			const sessionBooking =
				await this.sessionBookingService.getAllSessionBookings();
			res.status(200).json(sessionBooking);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async getSessionBookingById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const sessionBooking =
				await this.sessionBookingService.getSessionBookingById(id);
			if (sessionBooking) {
				res.status(200).json(sessionBooking);
			} else {
				res.status(404).json({ message: "SessionBooking not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async createSessionBooking(req: Request, res: Response): Promise<void> {
		try {
			const sessionBooking = await this.sessionBookingService.createSessionBooking(
				req.body
			);
			res.status(201).json(sessionBooking);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async updateSessionBooking(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const sessionBooking = await this.sessionBookingService.updateSessionBooking(
				id,
				req.body
			);
			if (sessionBooking) {
				res.status(200).json(sessionBooking);
			} else {
				res.status(404).json({ message: "SessionBooking not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}

	async deleteSessionBooking(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const isDeleted = await this.sessionBookingService.deleteSessionBooking(id);
			if (isDeleted) {
				res.status(204).end();
			} else {
				res.status(404).json({ message: "SessionBooking not found" });
			}
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	}
}
