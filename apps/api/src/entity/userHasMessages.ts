import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne
  } from "typeorm";
  import { User } from "./user";
  import { Message } from "./message";
  
  @Entity()
  export class UserHasMessage {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @ManyToOne(() => User, user => user.id)
    user!: User;
  
    @ManyToOne(() => Message, message => message.idMessage)
    message!: Message;
  
    @Column()
    sendDate!: Date;
  }