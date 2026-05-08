import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserRole } from '../../common/enums/role.enum';
import { User } from '../../modules/users/entities/user.entity';

@Injectable()
export class InitialSeed implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Loyiha yurganda avtomatik ishga tushadi
  async onModuleInit() {
    await this.seedSuperAdmin();
  }

  async seedSuperAdmin() {
    const adminPhone = '+998901234567'; // O'z raqamingni yozishing mumkin

    // 1. Bazada bunday raqamli foydalanuvchi bor-yo'qligini tekshiramiz
    const adminExists = await this.userRepository.findOne({
      where: { phone: adminPhone },
    });

    if (!adminExists) {
      // 2. Parolni xavfsiz shifrlash
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash('Shikh2026!', salt);

      // 3. SuperAdmin obyektini yaratish
      const superAdmin = this.userRepository.create({
        full_name: 'Sotimov Shixnazar',
        phone: adminPhone,
        password: hashedPassword,
        role: UserRole.SUPERADMIN,
      });

      // 4. Bazaga saqlash
      await this.userRepository.save(superAdmin);

      console.log('----------------------------------------------------');
      console.log('🚀 INITIAL SEED: SuperAdmin muvaffaqiyatli yaratildi!');
      console.log(`📞 Phone: ${adminPhone}`);
      console.log(`🔑 Password: Shikh2026!`);
      console.log('----------------------------------------------------');
    } else {
      console.log('✅ INITIAL SEED: SuperAdmin allaqachon mavjud.');
    }
  }
}
