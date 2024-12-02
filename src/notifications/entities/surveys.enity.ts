import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Notification } from './notification.entity';
import { Question } from './questions.entity';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'date' })
  deadline: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Notification, (notification) => notification.survey, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  notification: Notification;

  @OneToMany(() => Question, (question) => question.survey, {
    eager: true,
    cascade: true,
  })
  questions: Question[];
}
