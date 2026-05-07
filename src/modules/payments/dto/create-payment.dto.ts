import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-id-shuyerda' })
  @IsUUID()
  @IsNotEmpty()
  studentId!: string;

  @ApiProperty({ example: 500000 })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amount!: number;

  @ApiProperty({ example: "Aprel to'lovi", required: false })
  @IsString()
  @IsOptional()
  comment?: string;
}
