import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Coach } from "./coach";

@Entity()
export class SessionBooking {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	dateStart!: Date;

	@Column()
	dateEnd!: Date;

	@ManyToOne(() => User, (user) => user.sessionBooking)
	user!: number;

	@ManyToOne(() => Coach, (coach) => coach.sessionBooking)
	coach!: number;

	//TODO add address
}
