import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const saved = await this.authService.register(email, password);
    return saved;
  }

  @Post('login')
  async login(@Body() body: Partial<UserEntity>) {
    const { email, password } = body;

    if (!email || !password) {
      throw new UnauthorizedException('Email and password are required');
    }

    const admin = await this.authService.validateAdmin(email, password);
    if (!admin) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(admin);
  }
}
