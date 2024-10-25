import { AppDataSource } from "../../ormconfig";
import { Role } from "../entity/role";

const roles = [
	{
		name: "admin",
		permissions: ["create_user", "delete_user", "update_user", "view_user"],
	},
	{
		name: "coach",
		permissions: ["create_session", "update_session", "view_session"],
	},
	{
		name: "student",
		permissions: ["view_session", "book_session"],
	},
];

export const seedRoles = async () => {
	const roleRepository = AppDataSource.getRepository(Role);

	for (const roleData of roles) {
		const existingRole = await roleRepository.findOneBy({
			name: roleData.name,
		});
		if (!existingRole) {
			const role = roleRepository.create(roleData);
			await roleRepository.save(role);
		}
	}
};
