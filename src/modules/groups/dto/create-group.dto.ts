import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ example: 'Matematika' })
  @IsString()
  @IsNotEmpty()
  direction!: string;

  @ApiProperty({ example: 'Muxamadiyev Ibroxim' })
  @IsString()
  @IsNotEmpty()
  teacher_name!: string;

  @ApiProperty({ example: '+998900113861' })
  @IsString()
  @IsNotEmpty()
  teacher_phone!: string;

  @ApiProperty({ example: 'DU-CHOR-JUMA' })
  @IsString()
  @IsNotEmpty()
  lesson_days!: string;

  @ApiProperty({ example: '14:00-16:00' })
  @IsString()
  @IsNotEmpty()
  time!: string;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  lesson_price!: number;

  @ApiProperty({ example: 'https://photo.link', required: false })
  @IsString()
  @IsOptional()
  teacher_photo?: string;
}
