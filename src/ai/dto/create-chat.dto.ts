import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

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
}
