import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class RegisterDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsOptional()
  @IsString()
  name?: string;
}

class LoginDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

class GoogleDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

class GoogleWebDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password, dto.name);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('google')
  google(@Body() dto: GoogleDto) {
    return this.authService.googleLogin(dto.token);
  }

  @Post('google-web')
  googleWeb(@Body() dto: GoogleWebDto) {
    return this.authService.googleWebLogin(dto.accessToken);
  }
}
