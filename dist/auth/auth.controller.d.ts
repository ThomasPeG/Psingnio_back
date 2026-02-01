import { AuthService } from './auth.service';
declare class RegisterDto {
    email: string;
    password: string;
    name?: string;
}
declare class LoginDto {
    email: string;
    password: string;
}
declare class GoogleDto {
    token: string;
}
declare class GoogleWebDto {
    accessToken: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        token: string;
        user: any;
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        user: any;
    }>;
    google(dto: GoogleDto): Promise<{
        token: string;
        user: any;
    }>;
    googleWeb(dto: GoogleWebDto): Promise<{
        token: string;
        user: any;
    }>;
}
export {};
