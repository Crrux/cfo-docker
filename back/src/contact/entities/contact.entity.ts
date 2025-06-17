import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname: string;

  @Column()
  email: string;

  @Column()
  tel: string;

  @Column('text')
  message: string;

  @Column()
  checkbox: boolean;

  @Column()
  reference: string;

  @CreateDateColumn()
  createdAt: Date;
}
