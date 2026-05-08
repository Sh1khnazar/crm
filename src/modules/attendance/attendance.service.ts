import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupsService } from '../groups/groups.service';
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
    private readonly groupsService: GroupsService,
  ) {}

  async create(
    createAttendanceDto: CreateAttendanceDto,
    user: { id: string; role: string; phone: string },
  ) {
    const { studentId, groupId, is_present, date, ...rest } =
      createAttendanceDto;

    // 1. Guruh tekshiruvi va ruxsat
    const group = await this.groupsService.findOne(groupId, user);

    // 2. O'quvchini topamiz
    const student = await this.studentRepo.findOne({
      where: { id: studentId },
    });
    if (!student) throw new NotFoundException("O'quvchi topilmadi!");

    // 3. O'quvchi shu guruhdami?
    if (student.groupId !== groupId) {
      throw new BadRequestException("O'quvchi ushbu guruhga tegishli emas!");
    }

    // 4. MOLIYAVIY MANTIQ: Faqat kelgan o'quvchidan pul yechiramiz
    if (is_present) {
      const DEBT_LIMIT = -200000;
      if (Number(student.balance) < DEBT_LIMIT) {
        throw new BadRequestException(
          `O'quvchining qarzi juda ko'p (${student.balance} so'm). Davomat uchun to'lov qiling!`,
        );
      }

      const LESSON_PRICE = Number(group.lesson_price) || 50000;
      student.balance = Number(student.balance) - LESSON_PRICE;
      await this.studentRepo.save(student);

      // To'lovlar tarixiga yozish
      const paymentRecord = this.paymentRepo.create({
        amount: LESSON_PRICE,
        type: PaymentType.EXPENSE,
        comment: `${date} kungi dars uchun yechildi.`,
        student: { id: studentId },
      });
      await this.paymentRepo.save(paymentRecord);
    }

    // 5. Yo'qlamani saqlash
    const attendance = this.attendanceRepo.create({
      ...rest,
      is_present,
      date,
      studentId,
      groupId,
    });

    return await this.attendanceRepo.save(attendance);
  }

  async findByGroup(
    groupId: string,
    user: { id: string; role: string; phone: string },
  ) {
    await this.groupsService.findOne(groupId, user);

    return await this.attendanceRepo.find({
      where: { groupId },
      relations: ['student'],
      order: { date: 'DESC' },
    });
  }
}
