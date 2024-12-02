import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Notification } from './notification.entity';

@Entity()
export class ScheduledNotification {
  @PrimaryColumn()
  send_at: Date;

  @OneToOne(() => Notification, (notification) => notification.schedule, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  notification: Notification;
}
