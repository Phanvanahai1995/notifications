import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Answer } from './entities/answers.enity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Answer])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
