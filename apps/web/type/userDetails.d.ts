import { UserType } from "./user";
import { GoalType } from "./goalType";
import { LicenceType } from "./licenceType";
import { BillType } from "./billType";
import { UserDetailsHasSportsType } from "./userDetailsHasSport";

export type UserDetailsType = {
	id: number;
	user: UserType;
	weights: WeightType[];
	fatMasses: FatMassType[];
	bmis: BMIType[];
	muscleMasses: MuscleMassType[];
	heights: HeightType[];
	sports: UserDetailsHasSportsType[];
	goals: GoalType[];
	licences: LicenceType[];
	bills: BillType[];
};

export type WeightType = {
	id: number;
	date: Date;
	value: number;
	userDetails: UserDetailsType;
};

export type HeightType = {
	id: number;
	date: Date;
	value: number;
	userDetails: UserDetailsType;
};

export type FatMassType = {
	id: number;
	date: Date;
	value: number;
	userDetails: UserDetailsType;
};

export type BMIType = {
	id: number;
	date: Date;
	value: number;
	userDetails: UserDetailsType;
};

export type MuscleMassType = {
	id: number;
	date: Date;
	value: number;
	userDetails: UserDetailsType;
};
