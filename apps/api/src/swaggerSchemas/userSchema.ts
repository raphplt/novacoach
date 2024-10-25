export const userSchema = {
	type: "object",
	properties: {
		id: {
			type: "integer",
			description: "The auto-generated id of the user",
		},
		firstName: {
			type: "string",
			description: "The first name of the user",
		},
		lastName: {
			type: "string",
			description: "The last name of the user",
		},
		email: {
			type: "string",
			description: "The email of the user",
		},
		password: {
			type: "string",
			description: "The password of the user",
		},
		address: {
			type: "string",
			description: "The address of the user",
			nullable: true,
		},
		phone: {
			type: "string",
			description: "The phone number of the user",
			nullable: true,
		},
		createDate: {
			type: "string",
			format: "date-time",
			description: "The creation date of the user",
		},
		updateDate: {
			type: "string",
			format: "date-time",
			description: "The last update date of the user",
		},
	},
};
