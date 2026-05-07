import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../payments/entities/payment.entity';
import { Student } from '../students/entities/student.entity';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { Attendance } from './entities/attendance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Student, Payment])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
