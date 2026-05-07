import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentType } from '../payments/entities/payment.entity';
import { Student } from '../students/entities/student.entity';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    const { studentId, groupId, is_present, ...rest } = createAttendanceDto;

    // O'quvchini guruh ma'lumotlari bilan topamiz
    const student = await this.studentRepo.findOne({
      where: { id: studentId },
      relations: ['group'],
    });

    if (!student) throw new NotFoundException("O'quvchi topilmadi!");

    // 2. Xavfsizlik tekshiruvi: O'quvchi haqiqatda shu guruhdami?
    if (!student.group || student.group.id !== groupId) {
      throw new BadRequestException("O'quvchi ushbu guruhga tegishli emas!");
    }

    // QARZDORLIKNI TEKSHIRISH
    const DEBT_LIMIT = -200000; // Limit: -200,000 so'm

    if (Number(student.balance) < DEBT_LIMIT) {
      throw new BadRequestException(
        `O'quvchining qarzi juda ko'p (${student.balance} so'm). Davom ettirish uchun kamida ${Math.abs(DEBT_LIMIT)} so'm to'lov qiling!`,
      );
    }

    // MOLIYAVIY MANTIQ (Dinamik narx)
    const LESSON_PRICE = student.group.lesson_price || 50000;

    // Balansni yangilash
    student.balance -= LESSON_PRICE;
    await this.studentRepo.save(student);

    // To'lovlar tarixiga (Transaction Log) yozish
    const paymentRecord = this.paymentRepo.create({
      amount: LESSON_PRICE,
      type: PaymentType.EXPENSE,
      comment: `${createAttendanceDto.date} kungi dars.`,
      student: { id: studentId },
    });
    await this.paymentRepo.save(paymentRecord);

    // Yo'qlamani saqlash
    const attendance = this.attendanceRepo.create({
      ...rest,
      is_present,
      student: { id: studentId },
      group: { id: groupId },
    });

    return await this.attendanceRepo.save(attendance);
  }

  async findAll() {
    return await this.attendanceRepo.find({
      relations: ['student', 'group'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByGroup(groupId: string) {
    const attendanceRecords = await this.attendanceRepo.find({
      where: { group: { id: groupId } },
      relations: ['student'],
      order: { createdAt: 'DESC' },
    });

    return attendanceRecords;
  }
}
