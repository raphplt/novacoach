import { z } from "zod";

export const structureSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
	description: z.string().optional(),
	address: z
		.string()
		.min(2, { message: "L'adresse doit contenir au moins 2 caractères" }),
	phone: z.string().min(10, {
		message: "Le numéro de téléphone doit contenir au moins 10 caractères",
	}),
	logo: z.string().optional(),
});

export const registerInitialState = {
	message: "",
	errors: {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		credentials: "",
		unknown: "",
	},
};
