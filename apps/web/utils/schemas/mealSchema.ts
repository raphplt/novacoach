import z from "zod";

export const mealSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Le nom doit contenir au moins 2 caractères." })
		.max(255, { message: "Le nom ne doit pas dépasser 255 caractères." }),
	mealStarter: z
		.string()
		.min(2, {
			message: "L'entré doit contenir au moins 2 caractères.",
		})
		.max(255, {
			message: "L'entré ne doit pas dépasser 255 caractères.",
		}),
	mealMainCourse: z
		.string()
		.min(2, {
			message: "Le plat doit contenir au moins 2 caractères.",
		})
		.max(255, {
			message: "Le plat ne doit pas dépasser 255 caractères.",
		}),
	mainDessert: z
		.string()
		.min(2, {
			message: "Le dessert doit contenir au moins 2 caractères.",
		})
		.max(255, {
			message: "Le dessert ne doit pas dépasser 255 caractères.",
		}),
	endDate: z.date().optional(),
	complements: z
		.string()
		.min(2, {
			message: "Le complément doit contenir au moins 2 caractères.",
		})
		.max(255, {
			message: "Le complément ne doit pas dépasser 255 caractères.",
		}),
		dayTime: z
		.string()
		.regex(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/, {
			message: "Le format de l'heure doit être HH:MM.",
		})
		.optional(),
});
