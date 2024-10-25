import { AppDataSource } from "../../ormconfig";
import { UserDetails } from "../entity/userDetails";
import { User } from "../entity/user";
import { Weight } from "../entity/weight";
import { FatMass } from "../entity/fatMass";
import { BMI } from "../entity/bmi";
import { MuscleMass } from "../controllers/muscleMass";
import { Height } from "../entity/height";

export class UserDetailsService {
	private userDetailsRepository = AppDataSource.getRepository(UserDetails);
	private userRepository = AppDataSource.getRepository(User);
	private weightRepository = AppDataSource.getRepository(Weight);
	private fatMassRepository = AppDataSource.getRepository(FatMass);
	private bmiRepository = AppDataSource.getRepository(BMI);
	private muscleMassRepository = AppDataSource.getRepository(MuscleMass);
	private heightRepository = AppDataSource.getRepository(Height);

	async getAllUserDetails(): Promise<UserDetails[]> {
		return this.userDetailsRepository.find({
			relations: [
				"user",
				"heights",
				"weights",
				"fatMasses",
				"bmis",
				"muscleMasses",
				"sports",
			],
		});
	}

	async getUserDetailsByUserId(userId: number): Promise<UserDetails | null> {
		return this.userDetailsRepository.findOne({
			where: { user: { id: userId } },
			relations: [
				"user",
				"heights",
				"weights",
				"fatMasses",
				"bmis",
				"muscleMasses",
				"sports",
			],
		});
	}

	async getUserDetailsById(structureId: string): Promise<UserDetails[]> {
		const parsedId = parseInt(structureId, 10);

		const userDetails = await this.userDetailsRepository.find({
			where: {
				user: { id: parsedId },
			},
		});

		return userDetails;
	}

	async createUserDetails(
		userDetails: Partial<UserDetails>,
	): Promise<UserDetails> {
		const newUserDetails = this.userDetailsRepository.create(userDetails);
		return this.userDetailsRepository.save(newUserDetails);
	}

	async createUserDetailsForUser(
		userId: number,
		userDetails: Partial<UserDetails>,
	): Promise<UserDetails> {
		const user = await this.userRepository.findOneBy({ id: userId });
		if (!user) {
			throw new Error("User not found");
		}

		let existingUserDetails = await this.userDetailsRepository.findOne({
			where: { user: { id: userId } },
		});

		if (existingUserDetails) {
			await this.updateMetrics(existingUserDetails, userDetails);
			return this.userDetailsRepository.save(existingUserDetails);
		} else {
			const newUserDetails = this.userDetailsRepository.create({
				user,
			});
			const savedUserDetails =
				await this.userDetailsRepository.save(newUserDetails);
			await this.createMetrics(savedUserDetails, userDetails);
			return savedUserDetails;
		}
	}

	private async createMetrics(
		userDetails: UserDetails,
		metrics: Partial<UserDetails>,
	) {
		if (metrics.weights && metrics.weights.length > 0) {
			const weight = this.weightRepository.create({
				value: metrics.weights[0].value,
				userDetails,
			});
			await this.weightRepository.save(weight);
		}

		if (metrics.heights && metrics.heights.length > 0) {
			const height = this.heightRepository.create({
				value: metrics.heights[0].value,
				userDetails,
			});
			await this.heightRepository.save(height);
		}

		if (metrics.fatMasses && metrics.fatMasses.length > 0) {
			const fatMass = this.fatMassRepository.create({
				value: metrics.fatMasses[0].value,
				userDetails,
			});
			await this.fatMassRepository.save(fatMass);
		}

		if (metrics.bmis && metrics.bmis.length > 0) {
			const bmi = this.bmiRepository.create({
				value: metrics.bmis[0].value,
				userDetails,
			});
			await this.bmiRepository.save(bmi);
		}

		if (metrics.muscleMasses && metrics.muscleMasses.length > 0) {
			const muscleMass = this.muscleMassRepository.create({
				value: metrics.muscleMasses[0].value,
				userDetails,
			});
			await this.muscleMassRepository.save(muscleMass);
		}
	}

	private async updateMetrics(
		userDetails: UserDetails,
		metrics: Partial<UserDetails>,
	) {
		if (metrics.weights && metrics.weights.length > 0) {
			const newWeight = this.weightRepository.create({
				value: metrics.weights[0].value,
				userDetails,
			});
			await this.weightRepository.save(newWeight);
		}
		if (metrics.heights && metrics.heights.length > 0) {
			const newHeight = this.heightRepository.create({
				value: metrics.heights[0].value,
				userDetails,
			});
			await this.heightRepository.save(newHeight);
		}

		if (metrics.fatMasses && metrics.fatMasses.length > 0) {
			const newFatMass = this.fatMassRepository.create({
				value: metrics.fatMasses[0].value,
				userDetails,
			});
			await this.fatMassRepository.save(newFatMass);
		}

		if (metrics.bmis && metrics.bmis.length > 0) {
			const newBmi = this.bmiRepository.create({
				value: metrics.bmis[0].value,
				userDetails,
			});
			await this.bmiRepository.save(newBmi);
		}

		if (metrics.muscleMasses && metrics.muscleMasses.length > 0) {
			const newMuscleMass = this.muscleMassRepository.create({
				value: metrics.muscleMasses[0].value,
				userDetails,
			});
			await this.muscleMassRepository.save(newMuscleMass);
		}
	}

	async updateUserDetails(
		id: string,
		userDetails: Partial<UserDetails>,
	): Promise<UserDetails | null> {
		const userDetailsToUpdate = await this.userDetailsRepository.findOneBy({
			id: parseInt(id, 10),
		});
		if (userDetailsToUpdate) {
			Object.assign(userDetailsToUpdate, userDetails);
			await this.updateMetrics(userDetailsToUpdate, userDetails);
			return this.userDetailsRepository.save(userDetailsToUpdate);
		}
		return null;
	}

	async deleteUserDetails(id: string): Promise<boolean> {
		const userDetailsToDelete = await this.userDetailsRepository.findOneBy({
			id: parseInt(id, 10),
		});
		if (userDetailsToDelete) {
			await this.userDetailsRepository.remove(userDetailsToDelete);
			return true;
		}
		return false;
	}
}
