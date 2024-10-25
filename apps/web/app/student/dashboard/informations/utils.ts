import { z } from "zod";

export const userDetailsSchema = z.object({
	height: z.number().min(0, { message: "Height must be a positive number" }),
	weight: z.number().min(0, { message: "Weight must be a positive number" }),
	bmi: z.number().min(0, { message: "BMI must be a positive number" }),
	muscleMass: z
		.number()
		.min(0, { message: "Muscle Mass must be a positive number" }),
	fatMass: z
		.number()
		.min(0, { message: "Fat Mass must be a positive number" }),
});

export type UserDetailsFormInputs = z.infer<typeof userDetailsSchema>;