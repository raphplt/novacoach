import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany
} from "typeorm";
import { UserDetailsHasSports } from "./userdetailshassports";


@Entity()
export class Sport {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	name!: string;

	@Column()
	description!: string;

	@Column()
	icon!: string;

	@OneToMany(() => UserDetailsHasSports, (userDetailsHasSports) => userDetailsHasSports.sport)
	userDetailsHasSports!: UserDetailsHasSports[];

	//TODO ajout des relations
}
