import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Studioprojects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  headerImage: string;

  @Column('simple-array', { nullable: true })
  detailImages: string[];

  @CreateDateColumn()
  createdAT: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
