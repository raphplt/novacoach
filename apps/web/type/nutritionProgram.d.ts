import { MealType } from "./mealType";

export type NutritionProgramType = {
	id: number;
	name: string;
	duration: number;
	frequency: number;
	idStructure: number;
	nutritionProgramHasMeal: {
		id: number;
		meal: MealType;
	}[];
};
