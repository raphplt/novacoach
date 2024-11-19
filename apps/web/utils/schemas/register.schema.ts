import { z } from "zod";

export const registerSchema = z.object({
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
	phone: z
		.string()
		.max(10, {
			message:
				"Le numéro de téléphone ne peut pas dépasser 10 caractères",
		})
		.optional(),
	address: z
		.string()
		.max(255, {
			message: "L'adresse ne peut pas dépasser 255 caractères",
		})
		.optional(),
	email: z
		.string()
		.email({ message: "L'email doit être valide" })
		.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
			message: "L'email doit être au format correct",
		}),
		password: z.string()
		.min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
		.regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
		.regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
		.regex(/[^a-zA-Z0-9]/, { message: "Le mot de passe doit contenir au moins un caractère spécial" })
});
