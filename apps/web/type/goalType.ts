import { UserDetailsType } from "./userDetails";

export type GoalType = {
    id: number;
    name: string;
    description: string;
    value: number;
    startDate: Date;
    endDate: Date;
    idUserDetails: UserDetailsType;
    createDate: Date;
    updateDate: Date;
};
