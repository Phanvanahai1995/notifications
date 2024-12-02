import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class NotificationUserDto {
  @IsInt()
  @IsNotEmpty()
  receiver_id: number;

  @IsBoolean()
  is_student: boolean;
}
