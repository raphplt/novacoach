import z from "zod";

export const exerciceSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Le nom doit contenir au moins 2 caractères." })
		.max(255, { message: "Le nom ne doit pas dépasser 255 caractères." }),
	description: z
		.string()
		.min(2, {
			message: "La description doit contenir au moins 2 caractères.",
		})
		.max(255, {
			message: "La description ne doit pas dépasser 255 caractères.",
		}),
	duration: z.number({ message: "La durée doit être un nombre." }),
	reps: z.number({ message: "Les répétitions doivent être un nombre." }),
	sets: z.number({ message: "Les séries doivent être un nombre." }),
	breakTime: z.number({ message: "Le temps de pause doit être un nombre." }),
	image: z.string().nullable(),
});