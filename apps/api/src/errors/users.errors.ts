export class EmailAlreadyExistsError extends Error {
	constructor(message: string = "Email already exists") {
		super(message);
		this.name = "EmailAlreadyExistsError";
	}
}

export class UserNotFoundError extends Error {
	constructor(message: string = "User not found") {
		super(message);
		this.name = "UserNotFoundError";
	}
}
