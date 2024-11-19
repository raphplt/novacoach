import { StructureType } from "./structure";
import { UserType } from "./user";

export type BillType = {
	idBill: number;
	amount: number;
	dateIssued: Date;
	dateDue: Date;
	status: string;
	user: UserType;
	structure: StructureType;
};
