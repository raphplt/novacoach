import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserDetails } from "./userDetails";

@Entity()
export class Bill {
    @PrimaryGeneratedColumn()
    idBill!: number;

    @Column()
    amount!: number;

    @Column()
    dateIssued!: Date;

    @Column()
    dateDue!: Date;

    @Column()
    status!: string;

    @ManyToOne(() => UserDetails, (userDetails) => userDetails.bills)
    userDetails!: UserDetails;
}
