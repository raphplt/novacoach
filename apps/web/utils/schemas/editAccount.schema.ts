import { z } from "zod";

export const editAccountSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: "Le prénom doit contenir au moins 2 caractères" })
		.max(255, { message: "Le prénom ne peut pas dépasser 255 caractères" }),
	lastName: z
		.string()
		.min(2, {
			message: "Le nom de famille doit contenir au moins 2 caractères",
		})
		.max(255, {
			message: "Le nom de famille ne peut pas dépasser 255 caractères",
		}),
	email: z
		.string()
		.email({ message: "L'email doit être valide" })
		.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
			message: "L'email doit être au format correct",
		}),
	phone: z.string().optional(),
	address: z.string().optional(),
});
