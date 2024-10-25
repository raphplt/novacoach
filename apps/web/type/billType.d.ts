import { UserDetailsType } from "./userDetails";

export type BillType = {
    idBill: number;
    amount: number;
    dateIssued: Date;
    dateDue: Date;
    status: string;
    userDetails: UserDetailsType;
};
