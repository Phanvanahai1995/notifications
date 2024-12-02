import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { AnswerSurveyDto } from './dto/answer-survey.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    return await this.notificationsService.createNotification(
      createNotificationDto,
    );
  }

  @Get(':id')
  async getNotification(@Param('id', ParseIntPipe) id: number) {
    return await this.notificationsService.getNotification(id);
  }

  @Post('/:id/survey/answers')
  async answerSurveyNotification(
    @Param('id', ParseIntPipe) id: number,
    @Body() createAnserSurveyNotification: AnswerSurveyDto[],
  ) {
    // user_id
    return await this.notificationsService.createAnswerSurveyNotification(
      createAnserSurveyNotification,
      id,
    );
  }

  @Get('/:id/results')
  async getResultsNotifications(@Param('id', ParseIntPipe) id: number) {
    return await this.notificationsService.getResultsNotifications(id);
  }
}
