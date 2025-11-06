import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  phonenumber: number;

  @Column()
  service: string;

  @Column()
  details: string;

  @CreateDateColumn()
  createdAt: Date;
}
