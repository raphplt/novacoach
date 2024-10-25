import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.email({ message: "L'email doit être valide" })
		.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
			message: "L'email doit être au format correct",
		}),
	password: z.string().min(6, {
		message: "Le mot de passe doit contenir au moins 8 caractères",
	}),
});
