import { UserService } from "../services/user.service";
import { User } from "../entity/user";
import { AppDataSource } from "../../ormconfig";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

jest.mock("../../ormconfig", () => ({
	AppDataSource: {
		getRepository: jest.fn(),
	},
}));

describe("UserService", () => {
	let userService: UserService;
	let userRepository: jest.Mocked<Repository<User>>;

	beforeAll(() => {
		userRepository = {
			find: jest.fn(),
			findOneBy: jest.fn(),
			create: jest.fn(),
			save: jest.fn(),
			remove: jest.fn(),
		} as any;
		(AppDataSource.getRepository as jest.Mock).mockReturnValue(userRepository);
		userService = new UserService();
	});

	it("should return all users", async () => {
		const users: User[] = [
			{
				id: 1,
				firstName: "John",
				lastName: "Doe",
				email: "john@example.com",
				password: "hashedpassword",
				createDate: new Date(),
				updateDate: new Date(),
			},
		];
		userRepository.find.mockResolvedValue(users);

		const result = await userService.getAllUsers();

		expect(result).toEqual(users);
		expect(userRepository.find).toHaveBeenCalled();
	});

	it("should create a new user", async () => {
		const user: Partial<User> = {
			firstName: "Jane",
			lastName: "Doe",
			email: "jane@example.com",
			password: "password",
		};
		const savedUser: User = {
			id: 1,
			...user,
			password: "hashedpassword",
			createDate: new Date(),
			updateDate: new Date(),
		} as User;
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(user.password!, salt);
		userRepository.create.mockReturnValue({
			...user,
			id: 1,
			password: hashedPassword,
			createDate: new Date(),
			updateDate: new Date(),
		} as User);
		userRepository.save.mockResolvedValue(savedUser);

		const result = await userService.createUser(user);

		expect(result).toEqual(savedUser);
		expect(userRepository.create).toHaveBeenCalledWith({
			...user,
			id: expect.any(Number),
			password: hashedPassword,
			createDate: expect.any(Date),
			updateDate: expect.any(Date),
		} as User);
		expect(userRepository.save).toHaveBeenCalledWith({
			...user,
			id: expect.any(Number),
			password: hashedPassword,
			createDate: expect.any(Date),
			updateDate: expect.any(Date),
		} as User);
	});
});
