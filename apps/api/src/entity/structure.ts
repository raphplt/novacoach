import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";
import { Coach } from "./coach";
import { User } from "./user";

@Entity()
export class Structure {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column({ nullable: true })
	description?: string;

	@Column()
	address?: string;

	@Column()
	phone?: string;

	@Column({ nullable: true })
	logo?: string;

	@CreateDateColumn({ type: "timestamp" })
	createDate!: Date;

	@UpdateDateColumn({ type: "timestamp" })
	updateDate!: Date;

	// Relations
	@OneToMany(() => User, (user) => user.structure)
	users?: User[];

	@OneToMany(() => Coach, (coach) => coach.structure)
	coaches?: Coach[];
}
