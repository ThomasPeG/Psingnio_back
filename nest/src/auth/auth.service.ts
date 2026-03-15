import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private googleClient: OAuth2Client;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    if (!clientId) {
      console.warn(
        '⚠️ GOOGLE_CLIENT_ID is not defined. Google Login will fail.',
      );
    }
    this.googleClient = new OAuth2Client(clientId);
  }

  async register(email: string, password: string, name?: string) {
    const user = await this.usersService.createWithPassword(
      email,
      password,
      name,
    );
    const token = await this.sign(user.id, user.email);
    return { token, user: this.sanitizeUser(user) };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.validatePassword(email, password);
    const token = await this.sign(user.id, user.email);
    return { token, user: this.sanitizeUser(user) };
  }

  async googleLogin(idToken: string) {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    if (!payload?.email || !payload?.sub)
      throw new BadRequestException('Token de Google inválido');
    const user = await this.usersService.upsertGoogle(
      payload.email,
      payload.sub,
      payload.name,
    );
    const token = await this.sign(user.id, user.email);
    return { token, user: this.sanitizeUser(user) };
  }

  async googleWebLogin(accessToken: string) {
    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) {
        throw new BadRequestException('Invalid access token');
      }
      const data = await res.json();
      if (!data.email || !data.sub) {
        throw new BadRequestException('Invalid Google User Data');
      }

      const user = await this.usersService.upsertGoogle(
        data.email,
        data.sub,
        data.name,
      );
      const token = await this.sign(user.id, user.email);
      return { token, user: this.sanitizeUser(user) };
    } catch (e) {
      throw new BadRequestException('Failed to verify Google Token');
    }
  }

  async sign(sub: string, email: string) {
    return this.jwtService.signAsync({ sub, email });
  }

  private sanitizeUser(user: any) {
    // Convert Mongoose doc to object and remove password
    const obj = user.toObject ? user.toObject() : user;
    const { password, ...result } = obj;
    return result;
  }
}
