import { z } from "zod";

export const invitationSchema = z.object({
	email: z
		.string()
		.email({
			message: "L'email doit être valide",
		})
		.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
			message: "L'email doit être au format correct",
		}),
});
