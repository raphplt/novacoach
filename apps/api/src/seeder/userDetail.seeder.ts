import { AppDataSource } from "../../ormconfig";
import { UserDetails } from "../entity/userDetails";
import { User } from "../entity/user";
import { Height } from "../entity/height";
import { Weight } from "../entity/weight";
import { BMI } from "../entity/bmi";
import { FatMass } from "../entity/fatMass";
import { faker } from "@faker-js/faker";
import { MuscleMass } from "../controllers/muscleMass";

export const seedUserDetails = async (count: number) => {
	const userDetailsRepository = AppDataSource.getRepository(UserDetails);
	const userRepository = AppDataSource.getRepository(User);
	const heightRepository = AppDataSource.getRepository(Height);
	const weightRepository = AppDataSource.getRepository(Weight);
	const bmiRepository = AppDataSource.getRepository(BMI);
	const muscleMassRepository = AppDataSource.getRepository(MuscleMass);
	const fatMassRepository = AppDataSource.getRepository(FatMass);

	const users = await userRepository.find();

	for (let i = 0; i < count; i++) {
		const user = users[i];
		if (!user) break;

		const userDetails = userDetailsRepository.create({
			user: user,
		});
		await userDetailsRepository.save(userDetails);

		const height = heightRepository.create({
			value: faker.number.int({ min: 150, max: 200 }),
			userDetails: userDetails,
		});
		await heightRepository.save(height);

		const weight = weightRepository.create({
			value: faker.number.int({ min: 50, max: 100 }),
			userDetails: userDetails,
		});
		await weightRepository.save(weight);

		const bmi = bmiRepository.create({
			value: faker.number.float({ min: 18.5, max: 30 }),
			userDetails: userDetails,
		});
		await bmiRepository.save(bmi);

		const muscleMass = muscleMassRepository.create({
			value: faker.number.float({ min: 20, max: 50 }),
			userDetails: userDetails,
		});
		await muscleMassRepository.save(muscleMass);

		const fatMass = fatMassRepository.create({
			value: faker.number.float({ min: 10, max: 30 }),
			userDetails: userDetails,
		});
		await fatMassRepository.save(fatMass);

		// Mettre à jour l'utilisateur pour ajouter la relation avec userDetails
		user.userDetails = userDetails;
		await userRepository.save(user);
	}
};
