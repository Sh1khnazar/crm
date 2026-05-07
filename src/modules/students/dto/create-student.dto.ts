import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'Muxamadaliyev Ibroxim' })
  @IsString()
  @IsNotEmpty()
  full_name!: string;

  @ApiProperty({ example: '+998900113861' })
  @IsPhoneNumber()
  phone!: string;

  @ApiProperty({ example: 'Backend' })
  @IsString()
  direction!: string;

  @ApiProperty({ example: 'Ota-onasi ismi' })
  @IsString()
  parent_name!: string;

  @ApiProperty({ example: '+998901234567' })
  @IsPhoneNumber()
  parent_phone!: string;

  @ApiProperty({ example: 'uuid-guruh-id-bu-yerda', required: false })
  @IsUUID()
  @IsOptional()
  groupId?: string; // O'quvchi guruhsiz ham bo'lishi mumkin (masalan, hali tanlamagan)
}
