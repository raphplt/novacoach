import request from "supertest";
import { AppDataSource } from "../../ormconfig";
import app from "../app";

beforeAll(async () => {
	await AppDataSource.initialize();
});

afterAll(async () => {
	await AppDataSource.destroy();
});

describe("User Routes", () => {
	it("should get all users", async () => {
		const response = await request(app).get("/api/users");
		expect(response.status).toBe(200);
		expect(response.body).toBeInstanceOf(Array);
	});

	it("should create a new user", async () => {
		const user = {
			firstName: "Jane",
			lastName: "Doe",
			email: "jane@example.com",
			password: "password",
		};
		const response = await request(app).post("/api/users").send(user);
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.firstName).toBe(user.firstName);
		expect(response.body.email).toBe(user.email);
	});
});
