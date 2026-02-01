"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const quiz_service_1 = require("../quiz/quiz.service");
const users_service_1 = require("../users/users.service");
let PaymentService = class PaymentService {
    quizService;
    usersService;
    constructor(quizService, usersService) {
        this.quizService = quizService;
        this.usersService = usersService;
    }
    async createIntent(attemptId) {
        const attempt = await this.quizService.findOne(attemptId);
        if (!attempt) {
            throw new common_1.NotFoundException('Quiz attempt not found');
        }
        return {
            clientSecret: `mock_secret_${attemptId}_${Date.now()}`,
            paypalLink: `https://paypal.me/mock?ref=${attemptId}`,
        };
    }
    async handleWebhook(body) {
        if (body.attemptId) {
            const attempt = await this.quizService.markAsPaid(body.attemptId, 'mock_txn_' + Date.now());
            if (attempt?.userId) {
                await this.usersService.markPremium(String(attempt.userId));
            }
            return { success: true };
        }
        return { success: false, message: 'No attemptId in webhook body' };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [quiz_service_1.QuizService,
        users_service_1.UsersService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map