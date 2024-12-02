import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { AnswerSurveyDto } from './dto/answer-survey.dto';
import { Answer } from './entities/answers.enity';
import { QuestionType } from './enum/custom.enum';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    @InjectRepository(Answer)
    private readonly answersSurveyNotificationRepository: Repository<Answer>,
  ) {}

  async createNotification(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationsRepository.create(
      createNotificationDto,
    );

    return await this.notificationsRepository.save(notification);
  }

  async getNotification(id: number) {
    const notification = await this.notificationsRepository.findOneBy({ id });

    if (!notification)
      throw new BadRequestException(`No notification with id: ${id}`);

    return this.notificationsRepository.findOne({
      where: {
        id,
        // noti_user: {
        //   receiver_id: 12,
        // },
      },
    });
  }

  isArraySubset(arr1: number[], arr2: number[]) {
    const set1 = new Set(arr1);
    return arr2.every((item) => set1.has(item));
  }

  async createAnswerSurveyNotification(
    createAnswerSurveyNotification: AnswerSurveyDto[],
    id: number,
  ) {
    const notification = await this.notificationsRepository.findOne({
      where: {
        id,
      },
    });

    if (!notification)
      throw new BadRequestException(`No notification with ${id}`);

    if (!notification.survey)
      throw new BadRequestException(`No survey with notification id: ${id}`);

    const questionsIdsClient = createAnswerSurveyNotification.map(
      (q) => q.questionId,
    );

    const questionIdsNotifications = notification.survey.questions.map(
      (q) => q.id,
    );

    const isArraysEqual = this.isArraySubset(
      questionIdsNotifications,
      questionsIdsClient,
    );

    if (!isArraysEqual)
      throw new BadRequestException(
        'Question id not matched survey in notifications',
      );

    // check survey deadline va date.now()
    // @ts-ignore
    if (notification.survey.deadline > Date.now())
      throw new BadRequestException(`Survey time is up`);

    // check user send_at
    // if (notification.noti_user.find(n=>n.receiver_id === user_id).send_at)
    //   throw new BadRequestException(`Notification survey already exits`);

    // update user send_at => Date.now()

    notification.survey.questions
      .sort((a, b) => a.id - b.id)
      .map((q, i) => {
        if (q.id === createAnswerSurveyNotification[i].questionId) {
          // @ts-ignore
          q.answers = [
            ...q.answers,
            ...createAnswerSurveyNotification[i].answers,
          ];
        }
      });

    return await this.notificationsRepository.save(notification);
  }

  async getResultsNotifications(id: number) {
    const notification = await this.getNotification(id);

    const questions = notification.survey.questions;

    const results = questions.map((question, i) => {
      if (question.type === QuestionType.LONG_ANSWER_TEXT) {
        // find user
        const answers = question.answers.map((answer) => {
          return {
            user: answer.user_id,
            answer: answer.answer,
          };
        });

        return {
          [`${question.content}`]: answers,
        };
      }

      const answerCountMap = new Map();
      const totalAnswers = question.answers.length;

      question.options.forEach((option) => {
        answerCountMap.set(option.content, 0);
      });

      question.answers.forEach((answer) => {
        if (answerCountMap.has(answer.answer)) {
          answerCountMap.set(
            answer.answer,
            answerCountMap.get(answer.answer) + 1,
          );
        }
      });

      const percent_answer = question.options.map((option, i) => {
        const count = answerCountMap.get(option.content) || 0;
        const percentage =
          totalAnswers > 0 ? Math.round((count / totalAnswers) * 100) : 0;

        return {
          [`${i + 1}`]: percentage,
          answer: option.content,
        };
      });

      return {
        [`${question.content}`]: percent_answer,
      };
    });

    return results;
  }
}
