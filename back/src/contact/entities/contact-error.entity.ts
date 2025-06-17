import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ContactError {
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

  @Column('text')
  errorMessage: string;

  @CreateDateColumn()
  createdAt: Date;
}
