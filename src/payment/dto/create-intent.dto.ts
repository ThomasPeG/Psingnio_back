import { IsString, IsNotEmpty } from 'class-validator';

export class CreateIntentDto {
  @IsString()
  @IsNotEmpty()
  attemptId: string;
}
