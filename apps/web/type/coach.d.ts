import { StructureData } from "./structure";
import { UserType } from "./user";

export type CoachType = {
	id: number;
	description?: string;
	structure?: StructureData;
	userId?: UserType;
};
