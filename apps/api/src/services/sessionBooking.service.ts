import { AppDataSource } from "../../ormconfig";
import { SessionBooking } from "../entity/sessionBooking";

export class SessionBookingService {
	private sessionBookingRepository = AppDataSource.getRepository(SessionBooking);

	async getAllSessionBookings(): Promise<SessionBooking[]> {
		return this.sessionBookingRepository.find();
	}

	async getSessionBookingById(id: string): Promise<SessionBooking | null> {
		const parsedId = parseInt(id, 10);
		return this.sessionBookingRepository.findOneBy({
			id: parsedId,
		});
	}

	async createSessionBooking(
		sessionBooking: Partial<SessionBooking>
	): Promise<SessionBooking> {
		const newSessionBooking =
			this.sessionBookingRepository.create(sessionBooking);
		return this.sessionBookingRepository.save(newSessionBooking);
	}

	async updateSessionBooking(
		id: string,
		sessionBooking: Partial<SessionBooking>
	): Promise<SessionBooking | null> {
		const parsedId = parseInt(id, 10);
		const sessionBookingToUpdate = await this.sessionBookingRepository.findOneBy({
			id: parsedId,
		});
		if (sessionBookingToUpdate) {
			Object.assign(sessionBookingToUpdate, sessionBooking);
			return this.sessionBookingRepository.save(sessionBookingToUpdate);
		}
		return null;
	}

	async deleteSessionBooking(id: string): Promise<boolean> {
		const parsedId = parseInt(id, 10);
		const sessionBookingToDelete = await this.sessionBookingRepository.findOneBy({
			id: parsedId,
		});
		if (sessionBookingToDelete) {
			await this.sessionBookingRepository.remove(sessionBookingToDelete);
			return true;
		}
		return false;
	}
}
