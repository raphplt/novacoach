import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
} from "typeorm";
import { UserDetails } from "./userDetails";

@Entity()
export class Weight {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("float")
	value!: number;

	@CreateDateColumn({ type: "timestamp" })
	date!: Date;

	@ManyToOne(() => UserDetails, (userDetails) => userDetails.weights)
	userDetails!: UserDetails;
}
