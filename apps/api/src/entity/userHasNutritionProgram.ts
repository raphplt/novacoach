import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from "typeorm";
  import { User } from "./user";
  import { Coach } from "./coach";
  
  @Entity()
  export class UserHasNutritionProgram {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => User, user => user.id)
    user!: User;
  
    @ManyToOne(() => Coach, coach => coach.id)
    coach!: Coach;
  
    @Column()
    startDate!: Date;
  
    @Column({ nullable: true })
    endDate?: Date;
  }