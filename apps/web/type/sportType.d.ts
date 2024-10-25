import {UserDetailsHasSportsType} from "./userDetailsHasSport";

export type SportType = {
    id: number;
    name: string;
    userDetailsHasSports: UserDetailsHasSportsType[];
};
