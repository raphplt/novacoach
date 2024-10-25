import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserDetails } from "./userDetails";
import { Sport } from './sport';

@Entity()
export class UserDetailsHasSports {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => UserDetails, (userDetails) => userDetails.sports)
    userDetails!: UserDetails;

    @ManyToOne(() => Sport, (sport) => sport.userDetailsHasSports)
    sport!: Sport;
}
