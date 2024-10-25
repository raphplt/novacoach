import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invitation {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	token!: string;

	@Column()
	expiresAt!: Date;

	@Column({ nullable: true })
	usedAt?: Date;

	@Column()
	coachId!: number;

	@Column({ nullable: true })
	structureId?: number;

	@Column({ nullable: true })
	userId!: number;

	@Column({ nullable: true })
	userEmail!: string;
}