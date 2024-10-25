import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserDetails } from "./userDetails";

@Entity()
export class Licence {
    @PrimaryGeneratedColumn()
    idLicence!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    issueDate!: Date;

    @Column()
    expiryDate!: Date;

    @ManyToOne(() => UserDetails, (userDetails) => userDetails.licences)
    userDetails!: UserDetails;


}
