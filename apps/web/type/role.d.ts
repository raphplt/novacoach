export type Role = "student" | "coach" | "admin";

export type RoleType = {
	id: string;
	name: Role;
	permissions: string[];
};