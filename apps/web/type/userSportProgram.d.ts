import { SportProgramType } from "./sportProgram";

export type UserSportProgramType = {
	id: number;
	userId: number;
	sportProgram: SportProgramType;
	coachId: number;
	startDate: Date;
	endDate: Date;
};
