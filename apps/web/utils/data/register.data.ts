import { UserType } from "type/user";

export const initialUser: UserType = {
	id: 0,
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	address: "",
	role: {
		id: "",
		name: "student",
		permissions: [],
	},
	createDate: "",
	updateDate: "",
};
