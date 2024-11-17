import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from "./user";
import { Structure } from "./structure";

@Entity()
export class Bill {
	@PrimaryGeneratedColumn()
	idBill!: number;

	@Column()
	amount!: number;

	@Column()
	dateIssued!: Date;

	@Column()
	dateDue!: Date;

	@Column()
	status!: string;

	@ManyToOne(() => User, (user) => user.bills)
	user!: User;

	@ManyToOne(() => Structure, (structure) => structure.bills)
	structure!: Structure;
}
