import { SportProgramType } from "./sportProgram";

export type ExerciceType = {
	id: number;
	name: string;
	description?: string;
	duration?: number;
	reps?: number;
	sets?: number;
	breakTime?: number;
	image?: string;
	sportPrograms?: SportProgramType[];
};
