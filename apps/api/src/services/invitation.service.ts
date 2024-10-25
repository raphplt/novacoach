import { AppDataSource } from "../../ormconfig";
import { Coach } from "../entity/coach";
import { Invitation } from "../entity/invitation";
import { User } from "../entity/user";
import { v4 as uuidv4 } from "uuid";
import { UserService } from "./user.service";

export class InvitationService {
	private invitationRepository = AppDataSource.getRepository(Invitation);
	private userRepository = AppDataSource.getRepository(User);
	private coachRepository = AppDataSource.getRepository(Coach);
	private userService = new UserService();

	async createInvitation(
		invitation: Partial<Invitation>,
	): Promise<Invitation> {
		const newInvitation = this.invitationRepository.create(invitation);
		return this.invitationRepository.save(newInvitation);
	}

	async generateInvitationLink(
		coachId: number,
		studentEmail: string,
	): Promise<string> {
		const student = await this.userRepository.findOne({
			where: { email: studentEmail },
		});
		if (!student) {
			throw new Error("Student not found");
		}

		const coach = await this.coachRepository.findOne({
			where: { id: coachId },
			relations: ["structure"],
		});
		if (!coach || !coach.structure) {
			throw new Error("Coach or coach's structure not found");
		}

		const token = uuidv4();
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + 7);

		// console.log("Creating invitation", {
		// 	token,
		// 	expiresAt,
		// 	coachId,
		// 	structureId: coach.structure.id,
		// 	userId: student.id,
		// 	userEmail: student.email,
		// });

		await this.createInvitation({
			token,
			expiresAt,
			coachId,
			structureId: coach.structure.id,
			userId: student.id,
			userEmail: student.email,
		});

		return token;
	}

	async acceptInvitation(token: string, studentId: number): Promise<void> {
		const invitation = await this.invitationRepository.findOne({
			where: { token },
		});

		if (!invitation) {
			throw new Error("Invalid invitation token");
		}

		if (invitation.usedAt) {
			throw new Error("Invitation already used");
		}

		if (!studentId) {
			throw new Error("Student ID is missing");
		}

		const student = await this.userService.getUserById(
			studentId.toString(),
		);
		if (!student) {
			throw new Error("Student not found");
		}

		const coach = await this.coachRepository.findOne({
			where: { id: invitation.coachId },
		});
		if (!coach) {
			throw new Error("Coach not found");
		}

		student.structure = { id: invitation.structureId } as any;
		student.coach = coach;

		await this.userRepository.save(student);

		invitation.usedAt = new Date();
		await this.invitationRepository.save(invitation);
	}

	async getInvitationsByCoach(coachId: number): Promise<Invitation[]> {
		return this.invitationRepository.find({
			where: { coachId },
		});
	}

	async getInvitationsByUser(userId: number): Promise<Invitation[]> {
		return this.invitationRepository.find({
			where: { userId },
		});
	}
}