export const sportSchema = {
	type: "object",
	properties: {
		id: {
			type: "integer",
			description: "The auto-generated id of the sport",
		},
		name: {
			type: "string",
			description: "The name of the sport",
		},
		description: {
			type: "string",
			description: "The description of the sport",
		},
		icon: {
			type: "string",
			description: "The icon representing the sport",
		},
	},
};
