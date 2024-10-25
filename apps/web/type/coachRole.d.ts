import { StructureType } from "./structure";
import { UserType } from "./user";

export type CoachRoleType = {
	id: number;
	description: string;
	structure: StructureType | null;
	user: UserType | null;
	students: UserType[] | null;
};
