import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user";

@Entity()
export class Role {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column("simple-array")
	permissions!: string[];

	@OneToMany(() => User, (user) => user.role)
	users!: User[];
}
