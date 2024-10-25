export const sportProgramSchema = {
	type: "object",
	properties: {
		id: {
			type: "integer",
			description: "The auto-generated id of the sport program",
		},
		name: {
			type: "string",
			description: "The name of the sport program",
		},
		diificulty: {
			type: "string",
			description: "The difficulty level of the sport program",
			nullable: true,
		},
		duration: {
			type: "number",
			description: "The duration of the sport program in minutes",
			nullable: true,
		},
		frequency: {
			type: "number",
			description: "The frequency of the sport program per week",
		},
		sport: {
			type: "object",
			description: "The sport associated with the program",
			$ref: "#/entity/sport",
		},
		idStructure: {
			type: "number",
			description: "The id of the structure associated with the program",
		},
	},
};
