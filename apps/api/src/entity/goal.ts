import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { UserDetails } from "./userDetails";

@Entity()
export class Goal {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    value!: number;

    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;

    @ManyToOne(() => UserDetails, (userDetails) => userDetails.goals)
    idUserDetails!: UserDetails;

    @CreateDateColumn({ type: "timestamp" })
    createDate!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateDate!: Date;
}
