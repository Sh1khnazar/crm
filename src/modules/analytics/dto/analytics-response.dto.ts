import { ApiProperty } from '@nestjs/swagger';

export class DailyStatsResponseDto {
  @ApiProperty({ example: 1500000, description: 'Bugungi jami tushum summasi' })
  totalIncome!: number;

  @ApiProperty({ example: 85.5, description: 'Bugungi davomat foizi (%)' })
  attendanceRate!: number;

  @ApiProperty({
    example: 12,
    description: "Balansi minusda bo'lgan o'quvchilar soni",
  })
  activeDebtorsCount!: number;

  @ApiProperty({
    example: 450000,
    description: 'Bugungi darslardan yechilgan jami summa',
  })
  totalLessonsRevenue!: number;
}
