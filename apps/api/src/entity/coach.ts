import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { Structure } from "./structure";
import { User } from "./user";
import { SessionBooking } from "./sessionBooking";

@Entity()
export class Coach {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    description?: string;

    // Relations
    @ManyToOne(() => Structure, (structure) => structure.coaches, {
        nullable: true,
    })
    structure?: Structure | null;

    // Représente le user qui est le coach
    @OneToOne(() => User)
    @JoinColumn()
    user!: User;

    // Représente les élèves du coach
    @OneToMany(() => User, (user) => user.coach)
    students?: User[];

    @OneToMany(() => SessionBooking, (sessionBooking) => sessionBooking.coach)
    sessionBooking?: SessionBooking[];
}