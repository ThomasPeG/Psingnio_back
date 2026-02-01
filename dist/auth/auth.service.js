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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const google_auth_library_1 = require("google-auth-library");
let AuthService = class AuthService {
    usersService;
    jwtService;
    configService;
    googleClient;
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        const clientId = this.configService.get('GOOGLE_CLIENT_ID');
        this.googleClient = new google_auth_library_1.OAuth2Client(clientId);
    }
    async register(email, password, name) {
        const user = await this.usersService.createWithPassword(email, password, name);
        const token = await this.sign(user.id, user.email);
        return { token, user: this.sanitizeUser(user) };
    }
    async login(email, password) {
        const user = await this.usersService.validatePassword(email, password);
        const token = await this.sign(user.id, user.email);
        return { token, user: this.sanitizeUser(user) };
    }
    async googleLogin(idToken) {
        const clientId = this.configService.get('GOOGLE_CLIENT_ID');
        const ticket = await this.googleClient.verifyIdToken({
            idToken,
            audience: clientId,
        });
        const payload = ticket.getPayload();
        if (!payload?.email || !payload?.sub)
            throw new common_1.BadRequestException('Token de Google inválido');
        const user = await this.usersService.upsertGoogle(payload.email, payload.sub, payload.name);
        const token = await this.sign(user.id, user.email);
        return { token, user: this.sanitizeUser(user) };
    }
    async googleWebLogin(accessToken) {
        try {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (!res.ok) {
                throw new common_1.BadRequestException('Invalid access token');
            }
            const data = await res.json();
            if (!data.email || !data.sub) {
                throw new common_1.BadRequestException('Invalid Google User Data');
            }
            const user = await this.usersService.upsertGoogle(data.email, data.sub, data.name);
            const token = await this.sign(user.id, user.email);
            return { token, user: this.sanitizeUser(user) };
        }
        catch (e) {
            throw new common_1.BadRequestException('Failed to verify Google Token');
        }
    }
    async sign(sub, email) {
        return this.jwtService.signAsync({ sub, email });
    }
    sanitizeUser(user) {
        const obj = user.toObject ? user.toObject() : user;
        const { password, ...result } = obj;
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map