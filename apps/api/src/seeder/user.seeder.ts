import { AppDataSource } from "../../ormconfig";
import { User } from "../entity/user";
import { faker } from "@faker-js/faker";
import { Role } from "../entity/role";
import { Structure } from "../entity/structure";
import * as bcrypt from "bcrypt";

export const seedUsers = async (count: number) => {
	const userRepository = AppDataSource.getRepository(User);
	const roleRepository = AppDataSource.getRepository(Role);
	const structureRepository = AppDataSource.getRepository(Structure);

	const roles = await roleRepository.find();
	const structures = await structureRepository.find();

	// Find specific roles
	const coachRole = roles.find((role) => role.name === "coach");
	const adminRole = roles.find((role) => role.name === "admin");
	const studentRole = roles.find((role) => role.name === "student");

	// Create specific users
	const specificUsers = [
		{
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			email: "coach@gmail.com",
			password: "password",
			address: "123 Main St",
			phone: "123-456-7890",
			role: coachRole,
			structure: faker.helpers.arrayElement(structures),
		},
		{
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			email: "admin@gmail.com",
			password: "password",
			address: "456 Elm St",
			phone: "987-654-3210",
			role: adminRole,
			structure: faker.helpers.arrayElement(structures),
		},
		{
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			email: "eleve@gmail.com",
			password: "password",
			address: "789 Oak St",
			phone: "555-555-5555",
			role: studentRole,
			structure: faker.helpers.arrayElement(structures),
		},
	];
	for (const userData of specificUsers) {
		const salt = await bcrypt.genSalt(10);
		userData.password = await bcrypt.hash(userData.password, salt);
		const user = userRepository.create(userData);
		await userRepository.save(user);
	}

	// Create random users
	for (let i = 0; i < count; i++) {
		const user = userRepository.create({
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			address: faker.location.streetAddress(),
			phone: faker.phone.number(),
			role: faker.helpers.arrayElement(roles),
			structure: faker.helpers.arrayElement(structures),
		});
		await userRepository.save(user);
	}
};