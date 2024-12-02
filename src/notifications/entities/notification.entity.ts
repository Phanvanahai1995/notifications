import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusNotification, TargetType } from '../enum/custom.enum';
import { Survey } from './surveys.enity';
import { ScheduledNotification } from './scheduled_notifications.entity';
import { NotificationsUsers } from './notifications_users.entity';
import { File } from '../types/types';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenant_id: number;

  @Column({ type: 'enum', enum: TargetType })
  target_type: TargetType;

  @Column()
  title: string;

  @Column()
  subject: string;

  @Column()
  message: string;

  @Column()
  tag: string;

  @Column({ type: 'simple-json' })
  files: File[];

  @Column({ type: 'enum', enum: StatusNotification })
  status: StatusNotification;

  @Column()
  sender_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Survey, (survey) => survey.notification, {
    eager: true,
    cascade: true,
  })
  survey?: Survey;

  @OneToOne(() => ScheduledNotification, (schedule) => schedule.notification, {
    eager: true,
    cascade: true,
  })
  schedule?: ScheduledNotification;

  @OneToMany(() => NotificationsUsers, (noti_user) => noti_user.notification, {
    eager: true,
    cascade: true,
  })
  noti_user: NotificationsUsers[];
}
