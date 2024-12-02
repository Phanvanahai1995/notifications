import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from './notifications/notifications.module';
import { Notification } from './notifications/entities/notification.entity';
import { Survey } from './notifications/entities/surveys.enity';
import { ScheduledNotification } from './notifications/entities/scheduled_notifications.entity';
import { NotificationsUsers } from './notifications/entities/notifications_users.entity';
import { Question } from './notifications/entities/questions.entity';
import { Option } from './notifications/entities/options.entity';
import { Answer } from './notifications/entities/answers.enity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.PASSWORD,
      database: 'notifications',
      entities: [
        Notification,
        Survey,
        ScheduledNotification,
        NotificationsUsers,
        Question,
        Option,
        Answer,
      ],
      synchronize: true,
    }),
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
