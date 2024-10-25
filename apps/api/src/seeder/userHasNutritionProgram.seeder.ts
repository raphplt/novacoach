import { AppDataSource } from "../../ormconfig";
import { UserHasNutritionProgram } from "../entity/userHasNutritionProgram";
import { User } from "../entity/user";
import { Coach } from "../entity/coach";
import { faker } from "@faker-js/faker";

export const seedUserHasNutritionPrograms = async (count: number) => {
	const userHasNutritionProgramRepository = AppDataSource.getRepository(
		UserHasNutritionProgram,
	);
	const userRepository = AppDataSource.getRepository(User);
	const coachRepository = AppDataSource.getRepository(Coach);

	const users = await userRepository.find();
	const coaches = await coachRepository.find();

	for (let i = 0; i < count; i++) {
		const userHasNutritionProgram =
			userHasNutritionProgramRepository.create({
				user: faker.helpers.arrayElement(users),
				coach: faker.helpers.arrayElement(coaches),
				startDate: faker.date.past(),
				endDate: faker.date.future(),
			});
		await userHasNutritionProgramRepository.save(userHasNutritionProgram);
	}
};
