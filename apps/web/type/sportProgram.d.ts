import { SportType } from "./sportType";

export type SportProgramType = {
    id: number;
    name: string;
    difficulty: string;
    duration: number;
    frequency: number;
    sport: {
        id: number;
        name: string;
    };
    idStructure: number;
    sport: SportType;
};
