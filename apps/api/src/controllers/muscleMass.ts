import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { UserDetails } from "../entity/userDetails";

@Entity()
export class MuscleMass {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("float")
	value!: number;

	@CreateDateColumn({ type: "timestamp" })
	date!: Date;

	@ManyToOne(() => UserDetails, (userDetails) => userDetails.muscleMasses)
	userDetails!: UserDetails;
}
