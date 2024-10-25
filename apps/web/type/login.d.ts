export type LoginErrors = {
	email?: string;
	password?: string;
	credentials?: string;
	unknown?: string;
};

export type LoginState = {
	message: string;
	errors: LoginErrors;
};

export type LoginData = {
	email: string;
	password: string;
};
