import { AppDataSource } from "../../ormconfig";
import { Coach } from "../entity/coach";
import { User } from "../entity/user";
import { Structure } from "../entity/structure";
import { faker } from "@faker-js/faker";

export const seedCoaches = async (count: number) => {
	const coachRepository = AppDataSource.getRepository(Coach);
	const userRepository = AppDataSource.getRepository(User);
	const structureRepository = AppDataSource.getRepository(Structure);

	const users = await userRepository.find();
	const structures = await structureRepository.find();

	const specificUserEmails = [
		"coach@gmail.com",
		"admin@gmail.com",
		"eleve@gmail.com",
	];

	for (let i = 0; i < count; i++) {
		const user = users[i];
		if (!user) break;

		if (specificUserEmails.includes(user.email)) continue;

		const coach = coachRepository.create({
			description: faker.lorem.sentence(),
			user: user,
			structure: faker.helpers.arrayElement(structures),
		});
		await coachRepository.save(coach);

		user.coach = coach;
		await userRepository.save(user);
	}
};