import { Controller, Post, Body, Get, Param, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { QuizService } from './quiz.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('submit')
  async submit(@Body() dto: SubmitQuizDto, @Req() req: Request) {
    const auth = req.headers['authorization'] as string | undefined
    return this.quizService.submit(dto, auth);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getHistory(@Req() req: Request & { user: { sub: string } }) {
    return this.quizService.getUserHistory(req.user.sub);
  }

  @Get('result/:attemptId')
  async getResult(@Param('attemptId') attemptId: string) {
    const result = await this.quizService.getResult(attemptId);
    return result;
  }
}
