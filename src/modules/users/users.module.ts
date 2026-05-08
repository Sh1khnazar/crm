import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitialSeed } from '../../database/seeds/initial.seed';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, InitialSeed],
  exports: [UsersService], // Auth moduli foydalanishi uchun export qilamiz
})
export class UsersModule {}
