import { AppDataSource } from "../../ormconfig";
import { UserDetails } from "../entity/userDetails";
import { User } from "../entity/user";
import { faker } from "@faker-js/faker";

export const seedUserDetails = async (count: number) => {
	const userDetailsRepository = AppDataSource.getRepository(UserDetails);
	const userRepository = AppDataSource.getRepository(User);

	const users = await userRepository.find();

	for (let i = 0; i < count; i++) {
		const user = users[i]; // Assurez-vous de ne pas dépasser la longueur de la liste des utilisateurs
		if (!user) break;

		const userDetails = userDetailsRepository.create({
			height: faker.number.int({ min: 150, max: 200 }),
			mass: faker.number.int({ min: 50, max: 100 }),
			bmi: faker.number.float({ min: 18.5, max: 30 }),
			muscleMass: faker.number.float({ min: 20, max: 50 }),
			fatMass: faker.number.float({ min: 10, max: 30 }),
			user: user,
		});
		await userDetailsRepository.save(userDetails);

		// Mettre à jour l'utilisateur pour ajouter la relation avec userDetails
		user.userDetails = userDetails;
		await userRepository.save(user);
	}
};
