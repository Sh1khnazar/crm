import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment, PaymentType } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async topUp(createPaymentDto: CreatePaymentDto) {
    const { studentId, amount, comment } = createPaymentDto;

    const student = await this.studentRepo.findOne({
      where: { id: studentId },
    });
    if (!student) throw new NotFoundException("O'quvchi topilmadi");

    // Balansni oshiramiz
    student.balance += amount;
    await this.studentRepo.save(student);

    // INCOME (Kirim) sifatida tarixga yozamiz
    const payment = this.paymentRepo.create({
      amount,
      type: PaymentType.INCOME,
      comment: comment || "Balans to'ldirildi",
      student: { id: studentId },
    });

    return await this.paymentRepo.save(payment);
  }

  async findAllByStudent(studentId: string) {
    return await this.paymentRepo.find({
      where: { student: { id: studentId } },
      order: { createdAt: 'DESC' },
    });
  }
}
