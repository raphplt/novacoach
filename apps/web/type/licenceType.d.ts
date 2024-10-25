import { UserDetailsType } from "./userDetails";

export type LicenceType = {
    idLicence: number;
    name: string;
    description: string;
    issueDate: Date;
    expiryDate: Date;
    userDetails: UserDetailsType;
};
