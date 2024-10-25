import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
} from "typeorm";
import { UserDetails } from "./userDetails";

@Entity()
export class BMI {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("float")
	value!: number;

	@CreateDateColumn({ type: "timestamp" })
	date!: Date;

	@ManyToOne(() => UserDetails, (userDetails) => userDetails.bmis)
	userDetails!: UserDetails;
}
