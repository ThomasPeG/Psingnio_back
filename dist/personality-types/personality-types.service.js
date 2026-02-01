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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalityTypesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const personality_type_schema_1 = require("./schemas/personality-type.schema");
const personality_types_seed_1 = require("./personality-types.seed");
let PersonalityTypesService = class PersonalityTypesService {
    personalityTypeModel;
    constructor(personalityTypeModel) {
        this.personalityTypeModel = personalityTypeModel;
    }
    async onModuleInit() {
        console.log('Syncing Personality Types Seed...');
        for (const type of personality_types_seed_1.PERSONALITY_TYPES_SEED) {
            await this.personalityTypeModel.updateOne({ id: type.id }, { $set: type }, { upsert: true });
        }
        console.log('Personality Types Synced');
    }
    async findAll() {
        return this.personalityTypeModel.find().exec();
    }
    async findOne(id) {
        const type = await this.personalityTypeModel.findOne({ id }).exec();
        if (!type) {
            throw new common_1.NotFoundException(`Personality Type with ID ${id} not found`);
        }
        return type;
    }
};
exports.PersonalityTypesService = PersonalityTypesService;
exports.PersonalityTypesService = PersonalityTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(personality_type_schema_1.PersonalityType.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PersonalityTypesService);
//# sourceMappingURL=personality-types.service.js.map