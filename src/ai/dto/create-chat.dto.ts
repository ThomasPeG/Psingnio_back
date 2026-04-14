import { IsNotEmpty, IsString, IsNumber, IsOptional, IsIn } from 'class-validator';

export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsNumber()
  @IsNotEmpty()
  archetypeId: number;

  @IsNumber()
  @IsNotEmpty()
  secondaryArchetypeId: number;

  @IsOptional()
  @IsString()
  @IsIn(['mentor', 'friend'])
  mode?: 'mentor' | 'friend';
}
