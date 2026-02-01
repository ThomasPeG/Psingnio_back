import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private googleClient;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(email: string, password: string, name?: string): Promise<{
        token: string;
        user: any;
    }>;
    login(email: string, password: string): Promise<{
        token: string;
        user: any;
    }>;
    googleLogin(idToken: string): Promise<{
        token: string;
        user: any;
    }>;
    googleWebLogin(accessToken: string): Promise<{
        token: string;
        user: any;
    }>;
    sign(sub: string, email: string): Promise<string>;
    private sanitizeUser;
}
