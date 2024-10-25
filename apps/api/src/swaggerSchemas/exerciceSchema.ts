export const exerciceSchema = {
	type: "object",
	properties: {
		id: {
			type: "integer",
			description: "The auto-generated id of the exercice",
		},
		name: {
			type: "string",
			description: "The name of the exercice",
		},
		description: {
			type: "string",
			description: "The description of the exercice",
		},
		duration: {
			type: "number",
			description: "The duration of the exercice in seconds",
			nullable: true,
		},
		reps: {
			type: "number",
			description: "The number of repetitions",
			nullable: true,
		},
		sets: {
			type: "number",
			description: "The number of sets",
			nullable: true,
		},
		breakTime: {
			type: "number",
			description: "The break time between sets in seconds",
			nullable: true,
		},
		image: {
			type: "string",
			description: "The image URL of the exercice",
			nullable: true,
		},
	},
};
