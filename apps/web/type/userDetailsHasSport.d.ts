import { UserDetailsType } from "./userDetails";
import { SportType } from "./sport";

export type UserDetailsHasSportsType = {
    id: number;
    userDetails: UserDetailsType;
    sport: SportType;
};
