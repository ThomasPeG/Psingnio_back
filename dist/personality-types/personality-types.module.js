"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalityTypesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const personality_types_controller_1 = require("./personality-types.controller");
const personality_types_service_1 = require("./personality-types.service");
const personality_type_schema_1 = require("./schemas/personality-type.schema");
let PersonalityTypesModule = class PersonalityTypesModule {
};
exports.PersonalityTypesModule = PersonalityTypesModule;
exports.PersonalityTypesModule = PersonalityTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: personality_type_schema_1.PersonalityType.name, schema: personality_type_schema_1.PersonalityTypeSchema },
            ]),
        ],
        controllers: [personality_types_controller_1.PersonalityTypesController],
        providers: [personality_types_service_1.PersonalityTypesService],
        exports: [personality_types_service_1.PersonalityTypesService],
    })
], PersonalityTypesModule);
//# sourceMappingURL=personality-types.module.js.map