import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('planning_images')
export class PlanningImage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  imageData: string;
  @Column()
  fileName: string;
  @Column()
  mimeType: string;
  @Column({ default: true })
  isActive: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
