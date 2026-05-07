import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from '../attendance/entities/attendance.entity';
import { Group } from '../groups/entities/group.entity';
import { Lead } from '../leads/entities/lead.entity';
import { Payment, PaymentType } from '../payments/entities/payment.entity';
import { Student } from '../students/entities/student.entity';

// MUHIM: Bu interfeyslarni export qilish shart!
export interface RawTotal {
  total: string | null;
}

export interface MonthlyChartRaw {
  month: string;
  count: string;
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    @InjectRepository(Lead) private readonly leadRepo: Repository<Lead>,
  ) {}

  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [totalStudents, totalGroups, totalLeads] = await Promise.all([
      this.studentRepo.count(),
      this.groupRepo.count(),
      this.leadRepo.count(),
    ]);

    const incomeResult = await this.paymentRepo
      .createQueryBuilder('payment')
      .where('payment.type = :type', { type: PaymentType.INCOME })
      .andWhere('payment.createdAt >= :today', { today })
      .select('SUM(payment.amount)', 'total')
      .getRawOne<RawTotal>();

    return {
      totalStudents,
      totalGroups,
      totalLeads,
      todayIncome: parseFloat(incomeResult?.total || '0'),
    };
  }

  // Endi MonthlyChartRaw hamma joyda taniladi
  async getMonthlyStats(): Promise<MonthlyChartRaw[]> {
    return await this.studentRepo
      .createQueryBuilder('student')
      .select("TO_CHAR(student.createdAt, 'Mon')", 'month')
      .addSelect('COUNT(student.id)', 'count')
      .groupBy(
        "TO_CHAR(student.createdAt, 'Mon'), EXTRACT(MONTH FROM student.createdAt)",
      )
      .orderBy('EXTRACT(MONTH FROM student.createdAt)', 'ASC')
      .getRawMany<MonthlyChartRaw>();
  }
}
