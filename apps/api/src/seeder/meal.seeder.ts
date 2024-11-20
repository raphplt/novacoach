import { AppDataSource } from "../../ormconfig";
import { Meal } from "../entity/meal";
import { faker } from "@faker-js/faker";

export const seedMeals = async (count: number) => {
	const mealRepository = AppDataSource.getRepository(Meal);

	for (let i = 0; i < count; i++) {
		const meal = mealRepository.create({
			name: faker.lorem.word(),
			mealStarter: faker.lorem.word(),
			mealMainCourse: faker.lorem.word(),
			mainDessert: faker.lorem.word(),
			complements: faker.lorem.words(),
			dayTime: faker.date.recent(),
		});
		await mealRepository.save(meal);
	}
};
