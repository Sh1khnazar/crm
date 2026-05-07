import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty({ example: '2026-05-07' })
  @IsString()
  @IsNotEmpty()
  date!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsNotEmpty()
  is_present!: boolean;

  @ApiProperty({ example: 'Sababli', required: false })
  @IsString()
  @IsOptional()
  reason?: string;

  @ApiProperty({ example: 'student-uuid' })
  @IsUUID()
  @IsNotEmpty()
  studentId!: string;

  @ApiProperty({ example: 'group-uuid' })
  @IsUUID()
  @IsNotEmpty()
  groupId!: string;
}
