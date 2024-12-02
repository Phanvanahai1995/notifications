import { IsString, IsUrl } from 'class-validator';

export class File {
  @IsString()
  name: string;

  @IsString()
  @IsUrl()
  url: string;
}
