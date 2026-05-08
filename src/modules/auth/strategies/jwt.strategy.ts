import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Import qilish
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // Service-ni inject qilamiz
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY')!,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, phone: payload.phone, role: payload.role };
  }
}
