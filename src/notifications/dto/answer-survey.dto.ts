import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class AnswerDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsBoolean()
  @IsNotEmpty()
  is_student: boolean;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class AnswerSurveyDto {
  @IsInt()
  @IsNotEmpty()
  questionId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
