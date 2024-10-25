export type RegisterErrors = {
	email?: string;
	firstName?: string;
	lastName?: string;
	password?: string;
	credentials?: string;
	unknown?: string;
};

export type RegisterState = {
	message: string;
	errors: RegisterErrors;
};

export type RegisterData = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	passwordConfirmation: string;
};
