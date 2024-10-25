import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { UserDetails } from "./userDetails";

@Entity()
export class Height {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column("float")
	value!: number;

	@CreateDateColumn({ type: "timestamp" })
	date!: Date;

	@ManyToOne(() => UserDetails, (userDetails) => userDetails.heights)
	userDetails!: UserDetails;
}
