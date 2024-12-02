import { File } from '../types/types';
import { StatusNotification, TargetType } from '../enum/custom.enum';
import { Survey } from '../entities/surveys.enity';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ScheduledNotification } from '../entities/scheduled_notifications.entity';
import { Type } from 'class-transformer';
import { NotificationUserDto } from './create-noti-user.dto';

export class CreateNotificationDto {
  @IsInt()
  @IsNotEmpty()
  tenant_id: number;

  @IsEnum(TargetType)
  target_type: TargetType;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => File)
  files: File[];

  @IsEnum(StatusNotification)
  status: StatusNotification;

  @IsInt()
  @IsNotEmpty()
  sender_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NotificationUserDto)
  noti_user: NotificationUserDto[];

  @IsOptional()
  survey?: Survey;

  @IsOptional()
  schedule?: ScheduledNotification;
}
