import { ExerciceType } from "./exercice";
import { SportType } from "./sportType";

export type SportProgramType = {
	id: number;
	name: string;
	difficulty: string;
	duration: number;
	frequency: number;
	sport: SportType;
	idStructure: number;
	sportProgramHasExercices: {
		id: number;
		exercice: ExerciceType;
	}[];
};