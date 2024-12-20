import { RoleType } from "./role";
import { CoachType } from "./coach";
import { StructureType } from "./structure";
import { UserDetailsType } from "./userDetails";
import { UserSportProgramType } from "./userSportProgram";

export type UserType = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
	createDate: string;
	updateDate: string;
	profileImageUrl: string;
	role: RoleType;
	coachRole?: CoachType;
	userDetails?: UserDetailsType;
	coach?: CoachType;
	structure?: StructureType;
	userSportPrograms?: UserSportProgramType;
};
