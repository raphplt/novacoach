import { z } from "zod";

export const sportProgramSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Le nom du programme doit contenir au moins 2 caractères" })
		.max(255, { message: "Le nom du programme ne peut pas dépasser 255 caractères" }),
	difficulty: z
		.string()
		.min(2, {
			message: "Le niveau de difficulté doit contenir au moins 2 caractères",
		})
		.max(255, {
			message: "Le niveau de difficulté ne peut pas dépasser 255 caractères",
		}),
	duration: z
		.number(),
	frequency: z
		.number(),
	sportId: z
		.number()
});
