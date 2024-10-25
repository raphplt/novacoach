import { AppDataSource } from "../../ormconfig";
import { Licence } from "../entity/licence";
import { UserDetails } from "../entity/userDetails";
import { faker } from "@faker-js/faker";

export const seedLicences = async (count: number) => {
	const licenceRepository = AppDataSource.getRepository(Licence);
	const userDetailsRepository = AppDataSource.getRepository(UserDetails);

	const userDetails = await userDetailsRepository.find();

	for (let i = 0; i < count; i++) {
		const licence = licenceRepository.create({
			name: faker.lorem.word(),
			description: faker.lorem.sentence(),
			issueDate: faker.date.past(),
			expiryDate: faker.date.future(),
			userDetails: faker.helpers.arrayElement(userDetails),
		});
		await licenceRepository.save(licence);
	}
};
