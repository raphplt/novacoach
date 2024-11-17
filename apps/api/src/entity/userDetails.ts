import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { User } from "./user";
import { Weight } from "./weight";
import { FatMass } from "./fatMass";
import { BMI } from "./bmi";
import { Goal } from "./goal";
import { Licence } from "./licence";
import { Bill } from "./bill";
import { UserDetailsHasSports } from "./userdetailshassports";
import { MuscleMass } from "../controllers/muscleMass";
import { Height } from "./height";

@Entity()
export class UserDetails {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToOne(() => User, (user) => user.userDetails)
	@JoinColumn()
	user!: User;

	@OneToMany(() => Weight, (weight) => weight.userDetails)
	weights!: Weight[];

	@OneToMany(() => FatMass, (fatMass) => fatMass.userDetails)
	fatMasses!: FatMass[];

	@OneToMany(() => BMI, (bmi) => bmi.userDetails)
	bmis!: BMI[];

	@OneToMany(() => Height, (height) => height.userDetails)
	heights!: Height[];

	@OneToMany(() => MuscleMass, (muscleMass) => muscleMass.userDetails)
	muscleMasses!: MuscleMass[];

	@OneToMany(
		() => UserDetailsHasSports,
		(userDetailsHasSports) => userDetailsHasSports.userDetails,
	)
	sports!: UserDetailsHasSports[];

	@OneToMany(() => Goal, (goal) => goal.idUserDetails)
	goals!: Goal[];

	@OneToMany(() => Licence, (licence) => licence.userDetails)
	licences!: Licence[];

}
