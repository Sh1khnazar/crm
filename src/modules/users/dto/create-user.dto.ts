import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../../common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'Sotimov Shixnazar',
    description: 'Foydalanuvchining toʻliq ismi',
  })
  @IsString({ message: 'Ism matn koʻrinishida boʻlishi kerak' })
  @IsNotEmpty({ message: 'Ism boʻsh boʻlishi mumkin emas' })
  @Transform(({ value }) => value?.trim())
  full_name!: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Oʻzbekiston telefon raqami formati',
  })
  @IsPhoneNumber('UZ', {
    message: 'Telefon raqami notoʻgʻri formatda (+998XXXXXXXXX)',
  })
  @IsNotEmpty({ message: 'Telefon raqami majburiy' })
  phone!: string;

  @ApiProperty({
    example: '12345678',
    description: 'Minimal 8 ta belgidan iborat kuchli parol',
  })
  @IsString()
  @MinLength(8, { message: 'Parol kamida 8 ta belgidan iborat boʻlishi kerak' })
  @MaxLength(20, { message: 'Parol juda uzun' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Parol juda kuchsiz (Katta harf, raqam va belgi boʻlishi shart)',
  })
  password!: string;

  @ApiProperty({
    enum: UserRole,
    default: UserRole.TEACHER,
    required: false,
    description: 'Foydalanuvchi roli (admin, teacher, superadmin)',
  })
  @IsEnum(UserRole, { message: 'Bunday rol mavjud emas' })
  @IsOptional()
  role?: UserRole;
}
