import { UserDetailsType } from "./userDetails";

export type UserWeightType = {
    id: number;
    date: Date;
    weight: number;
    userDetails: UserDetailsType;
};
