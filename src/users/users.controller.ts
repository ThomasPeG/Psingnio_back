import {
  Controller,
  Get,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuizService } from '../quiz/quiz.service';
import { Request } from 'express';

@Controller('api/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly quizService: QuizService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req: Request & { user: { sub: string } }) {
    const user = await this.usersService.findById(req.user.sub);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const history = await this.quizService.getUserHistory(req.user.sub);

    return {
      user: {
        _id: user._id.toString(),
        email: user.email,
        name: user.name || '',
        isPremium: user.isPremium,
      },
      history,
    };
  }
}
