import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  QuizAttempt,
  QuizAttemptDocument,
} from './schemas/quiz-attempt.schema';
import { PersonalityTypesService } from '../personality-types/personality-types.service';
import { UsersService } from '../users/users.service';
import { SubmitQuizDto } from './dto/submit-quiz.dto';
import * as uuid from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(QuizAttempt.name)
    private quizAttemptModel: Model<QuizAttemptDocument>,
    private readonly personalityTypesService: PersonalityTypesService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async submit(dto: SubmitQuizDto, authHeader?: string) {
    const results = this.calculateResults(dto.answers);

    const attempt = new this.quizAttemptModel({
      attemptId: uuid.v4(),
      user_answers: dto.answers,
      calculated_type_id: results.dominantTypeId,
      secondary_type_id: results.secondaryTypeId,
      shadow_type_id: results.shadowTypeId,
      work_type_id: results.workTypeId,
      social_type_id: results.socialTypeId,
      money_type_id: results.moneyTypeId,
    });

    if (dto.partner_attempt_id) {
      const partnerAttempt = await this.quizAttemptModel
        .findOne({ attemptId: dto.partner_attempt_id })
        .exec();
      if (partnerAttempt) {
        attempt.linked_match_id = dto.partner_attempt_id;
      }
    }

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const payload = this.jwtService.verify(token);
        if (payload && payload.sub) {
          const userId = payload.sub;
          attempt.userId = new Types.ObjectId(userId);

          // Check Premium Limit
          const user = await this.usersService.findById(userId);
          if (user && !user.isPremium) {
            const count = await this.quizAttemptModel.countDocuments({
              userId: new Types.ObjectId(userId),
            });

            // Allow only 1 free quiz
            if (count >= 1) {
              throw new ForbiddenException({
                message: 'Has alcanzado el límite de quizzes gratuitos.',
                code: 'LIMIT_REACHED',
                details: 'Upgrade to Premium for unlimited quizzes.',
              });
            }
          }
        }
      } catch (e) {
        if (e instanceof ForbiddenException) {
          throw e;
        }
        // Ignore invalid tokens, proceed as guest
      }
    }

    await attempt.save();

    const personalityType = await this.personalityTypesService.findOne(
      results.dominantTypeId,
    );

    return {
      attemptId: attempt.attemptId,
      preview: {
        typeName: personalityType.name,
        snippet: personalityType.description_preview,
        blurData: 'Pay to see full details...',
      },
    };
  }

  async getResult(attemptId: string) {
    const attempt = await this.quizAttemptModel.findOne({ attemptId }).exec();
    if (!attempt) {
      throw new NotFoundException('Quiz attempt not found');
    }

    const dominant = await this.personalityTypesService.findOne(
      attempt.calculated_type_id,
    );

    if (attempt.is_paid) {
      const [secondary, shadow, work, social, money] = await Promise.all([
        this.personalityTypesService.findOne(attempt.secondary_type_id),
        this.personalityTypesService.findOne(attempt.shadow_type_id),
        this.personalityTypesService.findOne(attempt.work_type_id),
        this.personalityTypesService.findOne(attempt.social_type_id),
        this.personalityTypesService.findOne(attempt.money_type_id),
      ]);

      const basicInfo = (type: any) => ({
        id: type.id,
        titulo: type.titulo,
        descripcion: type.esencia,
      });

      return {
        is_paid: true,
        result: {
          dominant, // Full object
          secondary: {
            ...basicInfo(secondary),
            trabajo: secondary.trabajoIdeal,
          },
          shadow: { ...basicInfo(shadow), enSombra: shadow.enSombra },
          work: { ...basicInfo(work), trabajo: work.trabajoIdeal },
          social: { ...basicInfo(social), social: social.social },
          money: { ...basicInfo(money), dinero: money.dinero },
        },
      };
    } else {
      return {
        is_paid: false,
        preview: {
          typeName: dominant.name,
          snippet: dominant.description_preview,
        },
      };
    }
  }

  async getMatchReport(attemptIdA: string, attemptIdB: string) {
    const attemptA = await this.quizAttemptModel
      .findOne({ attemptId: attemptIdA })
      .exec();
    const attemptB = await this.quizAttemptModel
      .findOne({ attemptId: attemptIdB })
      .exec();

    if (!attemptA || !attemptB) {
      throw new NotFoundException('One or both attempts not found');
    }

    const typeA = await this.personalityTypesService.findOne(
      attemptA.calculated_type_id,
    );
    const typeB = await this.personalityTypesService.findOne(
      attemptB.calculated_type_id,
    );

    // Calculate compatibility
    let score = 65; // Base score
    let label = 'Desafío de Crecimiento';

    const aMatchesB = typeA.parejaPerfecta?.some((p) =>
      p.includes(`T${typeB.id}`),
    );
    const bMatchesA = typeB.parejaPerfecta?.some((p) =>
      p.includes(`T${typeA.id}`),
    );

    if (aMatchesB && bMatchesA) {
      score = 95;
      label = 'Pareja Dinámica';
    } else if (aMatchesB || bMatchesA) {
      score = 85;
      label = 'Complementarios';
    } else if (typeA.id === typeB.id) {
      score = 80;
      label = 'Espejos';
    }

    // Analysis generation
    const strengthA = typeA.enLuz?.[0]?.split(',')[0] || 'Fortaleza';
    const strengthB = typeB.enLuz?.[0]?.split(',')[0] || 'Fortaleza';

    const analysis = {
      strengths: [
        `Unión de ${strengthA} y ${strengthB}`,
        typeA.enLuz?.[1] || 'Visión compartida',
        typeB.enLuz?.[1] || 'Resiliencia mutua',
      ],
      challenges: [
        `Riesgo de ${typeA.enSombra?.[0]?.split(',')[0] || 'Sombra'} frente a ${typeB.enSombra?.[0]?.split(',')[0] || 'Sombra'}`,
        'Necesidad de equilibrar la energía',
      ],
      advice: `${typeA.mantra || ''} Recuerden: ${typeB.mantra || ''}`,
    };

    return {
      compatibility_score: score,
      label,
      analysis,
      archetypes: {
        user_a: typeA.name,
        user_b: typeB.name,
      },
    };
  }

  async markAsPaid(attemptId: string, paymentId: string) {
    const attempt = await this.quizAttemptModel.findOne({ attemptId }).exec();
    if (attempt) {
      attempt.is_paid = true;
      attempt.payment_id = paymentId;
      await attempt.save();
    }
    return attempt;
  }

  async findOne(attemptId: string) {
    return this.quizAttemptModel.findOne({ attemptId }).exec();
  }

  async getAttemptsByUserId(userId: string) {
    return this.quizAttemptModel.find({ userId }).exec();
  }

  async getUserHistory(userId: string) {
    // Ensure userId is an ObjectId if stored as such
    const query = Types.ObjectId.isValid(userId)
      ? { userId: new Types.ObjectId(userId) }
      : { userId };

    const attempts = await this.quizAttemptModel
      .find(query)
      .sort({ createdAt: -1 })
      .exec();

    const history = await Promise.all(
      attempts.map(async (attempt) => {
        const type = await this.personalityTypesService.findOne(
          attempt.calculated_type_id,
        );
        return {
          _id: attempt.attemptId,
          date: (attempt as any).createdAt,
          score: 0, // Placeholder
          resultTypeId: attempt.calculated_type_id.toString(),
          resultTypeName: type ? type.name : 'Unknown',
          snippet: type ? type.description_preview : '',
          is_paid: !!attempt.is_paid,
          payment_id: attempt.payment_id || null,
        };
      }),
    );

    return history;
  }

  private calculateResults(answers: { questionId: number; value: number }[]): {
    dominantTypeId: number;
    secondaryTypeId: number;
    shadowTypeId: number;
    workTypeId: number;
    socialTypeId: number;
    moneyTypeId: number;
  } {
    // Helper to get top type from a subset of answers
    const getTopType = (
      filteredAnswers: { questionId: number; value: number }[],
    ): { type: number; counts: Map<number, number> } => {
      if (filteredAnswers.length === 0) return { type: 1, counts: new Map() }; // Default if no answers in range
      const counts = new Map<number, number>();
      filteredAnswers.forEach((a) =>
        counts.set(a.value, (counts.get(a.value) || 0) + 1),
      );
      let maxType = 1;
      let maxCount = -1;
      counts.forEach((count, type) => {
        if (count > maxCount) {
          maxCount = count;
          maxType = type;
        }
      });
      return { type: maxType, counts };
    };

    // 1. Dominant & Secondary (Q1-Q40)
    const mainAnswers = answers.filter(
      (a) => a.questionId >= 1 && a.questionId <= 40,
    );
    const mainResult = getTopType(mainAnswers);
    const dominantTypeId = mainResult.type;

    // Calculate Secondary (2nd highest in Q1-Q40)
    let secondaryTypeId = dominantTypeId;
    if (mainResult.counts) {
      const sortedCounts = Array.from(mainResult.counts.entries()).sort(
        (a, b) => b[1] - a[1],
      );
      if (sortedCounts.length > 1) {
        secondaryTypeId = sortedCounts[1][0];
      }
    }

    // 2. Shadow (Q41-Q50)
    const shadowAnswers = answers.filter(
      (a) => a.questionId >= 41 && a.questionId <= 50,
    );
    const shadowTypeId = getTopType(shadowAnswers).type;

    // 3. Work (Q21-Q30)
    const workAnswers = answers.filter(
      (a) => a.questionId >= 21 && a.questionId <= 30,
    );
    const workTypeId = getTopType(workAnswers).type;

    // 4. Social (Q31-Q35)
    const socialAnswers = answers.filter(
      (a) => a.questionId >= 31 && a.questionId <= 35,
    );
    const socialTypeId = getTopType(socialAnswers).type;

    // 5. Money (Q36-Q40)
    const moneyAnswers = answers.filter(
      (a) => a.questionId >= 36 && a.questionId <= 40,
    );
    const moneyTypeId = getTopType(moneyAnswers).type;

    return {
      dominantTypeId,
      secondaryTypeId,
      shadowTypeId,
      workTypeId,
      socialTypeId,
      moneyTypeId,
    };
  }
}
