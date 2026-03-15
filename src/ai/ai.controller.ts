import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiService } from './ai.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Request } from 'express';
import { Throttle } from '@nestjs/throttler';

@Controller('api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 requests per minute
  @Post('chat')
  async getChatResponse(
    @Body() createChatDto: CreateChatDto,
    @Req() _req: Request & { user: { sub: string } }, // To ensure user is authenticated
  ) {
    return this.aiService.generateChatResponse(
      createChatDto.message,
      createChatDto.archetypeId,
      createChatDto.secondaryArchetypeId,
    );
  }

  @Get('models')
  async getModels() {
    return this.aiService.listModels();
  }
}
