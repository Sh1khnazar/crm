import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { phone, password } = loginDto;

    // 1. Foydalanuvchini telefon orqali topish
    const user = await this.usersService.findByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('Telefon raqami yoki parol notoʻgʻri');
    }

    // 2. Parolni solishtirish (Hashed comparison)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Telefon raqami yoki parol notoʻgʻri');
    }

    // 3. JWT Token yaratish
    const payload = { sub: user.id, phone: user.phone, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        full_name: user.full_name,
        role: user.role,
      },
    };
  }
}
