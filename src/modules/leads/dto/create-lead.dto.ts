import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLeadDto {
  // 'export' so'zi borligiga ishonch hosil qil!
  @ApiProperty({ example: 'Muxamadiyev Ibroxim' })
  @IsString()
  @IsNotEmpty()
  full_name!: string;

  @ApiProperty({ example: '+998900113861' })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({ example: 'Backend darslariga qiziqyapti', required: false })
  @IsString()
  comment?: string;
}
