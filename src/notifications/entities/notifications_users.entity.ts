import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Notification } from './notification.entity';

@Entity()
export class NotificationsUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  receiver_id: number;

  @Column()
  is_student: boolean;

  @Column({ type: 'date', nullable: true })
  read_at: Date;

  @Column({ type: 'date', nullable: true })
  send_at: Date;

  @ManyToOne(() => Notification, (notification) => notification.noti_user, {
    onDelete: 'CASCADE',
  })
  notification: Notification;
}
