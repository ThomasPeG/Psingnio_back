"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const quiz_attempt_schema_1 = require("./schemas/quiz-attempt.schema");
const personality_types_service_1 = require("../personality-types/personality-types.service");
const uuid = __importStar(require("uuid"));
const jwt_1 = require("@nestjs/jwt");
let QuizService = class QuizService {
    quizAttemptModel;
    personalityTypesService;
    jwtService;
    constructor(quizAttemptModel, personalityTypesService, jwtService) {
        this.quizAttemptModel = quizAttemptModel;
        this.personalityTypesService = personalityTypesService;
        this.jwtService = jwtService;
    }
    async submit(dto, authHeader) {
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
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            try {
                const payload = this.jwtService.verify(token);
                if (payload && payload.sub)
                    attempt.userId = new mongoose_2.Types.ObjectId(payload.sub);
            }
            catch (e) {
                if (e) {
                }
            }
        }
        await attempt.save();
        const personalityType = await this.personalityTypesService.findOne(results.dominantTypeId);
        return {
            attemptId: attempt.attemptId,
            preview: {
                typeName: personalityType.name,
                snippet: personalityType.description_preview,
                blurData: 'Pay to see full details...',
            },
        };
    }
    async getResult(attemptId) {
        const attempt = await this.quizAttemptModel.findOne({ attemptId }).exec();
        if (!attempt) {
            throw new common_1.NotFoundException('Quiz attempt not found');
        }
        const dominant = await this.personalityTypesService.findOne(attempt.calculated_type_id);
        if (attempt.is_paid) {
            const [secondary, shadow, work, social, money] = await Promise.all([
                this.personalityTypesService.findOne(attempt.secondary_type_id),
                this.personalityTypesService.findOne(attempt.shadow_type_id),
                this.personalityTypesService.findOne(attempt.work_type_id),
                this.personalityTypesService.findOne(attempt.social_type_id),
                this.personalityTypesService.findOne(attempt.money_type_id),
            ]);
            return {
                is_paid: true,
                result: {
                    dominant,
                    secondary,
                    shadow,
                    work,
                    social,
                    money,
                },
            };
        }
        else {
            return {
                is_paid: false,
                preview: {
                    typeName: dominant.name,
                    snippet: dominant.description_preview,
                },
            };
        }
    }
    async markAsPaid(attemptId, paymentId) {
        const attempt = await this.quizAttemptModel.findOne({ attemptId }).exec();
        if (attempt) {
            attempt.is_paid = true;
            attempt.payment_id = paymentId;
            await attempt.save();
        }
        return attempt;
    }
    async findOne(attemptId) {
        return this.quizAttemptModel.findOne({ attemptId }).exec();
    }
    async getAttemptsByUserId(userId) {
        return this.quizAttemptModel.find({ userId }).exec();
    }
    async getUserHistory(userId) {
        const query = mongoose_2.Types.ObjectId.isValid(userId)
            ? { userId: new mongoose_2.Types.ObjectId(userId) }
            : { userId };
        const attempts = await this.quizAttemptModel
            .find(query)
            .sort({ createdAt: -1 })
            .exec();
        const history = await Promise.all(attempts.map(async (attempt) => {
            const type = await this.personalityTypesService.findOne(attempt.calculated_type_id);
            return {
                _id: attempt.attemptId,
                date: attempt.createdAt,
                score: 0,
                resultTypeId: attempt.calculated_type_id.toString(),
                resultTypeName: type ? type.name : 'Unknown',
                imageUrl: type ? type.image_url : '',
                snippet: type ? type.description_preview : '',
            };
        }));
        return history;
    }
    calculateResults(answers) {
        const getTopType = (filteredAnswers) => {
            if (filteredAnswers.length === 0)
                return { type: 1, counts: new Map() };
            const counts = new Map();
            filteredAnswers.forEach((a) => counts.set(a.value, (counts.get(a.value) || 0) + 1));
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
        const mainAnswers = answers.filter((a) => a.questionId >= 1 && a.questionId <= 40);
        const mainResult = getTopType(mainAnswers);
        const dominantTypeId = mainResult.type;
        let secondaryTypeId = dominantTypeId;
        if (mainResult.counts) {
            const sortedCounts = Array.from(mainResult.counts.entries()).sort((a, b) => b[1] - a[1]);
            if (sortedCounts.length > 1) {
                secondaryTypeId = sortedCounts[1][0];
            }
        }
        const shadowAnswers = answers.filter((a) => a.questionId >= 41 && a.questionId <= 50);
        const shadowTypeId = getTopType(shadowAnswers).type;
        const workAnswers = answers.filter((a) => a.questionId >= 21 && a.questionId <= 30);
        const workTypeId = getTopType(workAnswers).type;
        const socialAnswers = answers.filter((a) => a.questionId >= 31 && a.questionId <= 35);
        const socialTypeId = getTopType(socialAnswers).type;
        const moneyAnswers = answers.filter((a) => a.questionId >= 36 && a.questionId <= 40);
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
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(quiz_attempt_schema_1.QuizAttempt.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        personality_types_service_1.PersonalityTypesService,
        jwt_1.JwtService])
], QuizService);
//# sourceMappingURL=quiz.service.js.map