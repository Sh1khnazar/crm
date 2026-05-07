import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';
import { Group } from '../../groups/entities/group.entity';
import { Payment } from '../../payments/entities/payment.entity'; // IMPORT QILISH

@Entity('students')
export class Student extends BaseEntity {
  @ApiProperty({ example: 'Muxamadaliyev Ibroxim' })
  @Column()
  full_name!: string;

  @ApiProperty({ example: '+998900113861' })
  @Column({ unique: true })
  phone!: string;

  @ApiProperty({ example: 'Backend' })
  @Column()
  direction!: string;

  @ApiProperty({ example: 'Ravshan' })
  @Column()
  parent_name!: string;

  @ApiProperty({ example: '+998901234567' })
  @Column()
  parent_phone!: string;

  @ApiProperty({ description: '3x4 rasm uchun URL', nullable: true })
  @Column({ nullable: true })
  photo!: string;

  @ApiProperty({ example: 0 })
  @Column({
    default: 0,
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  balance!: number;

  @ManyToOne(() => Group, (group) => group.students, { onDelete: 'SET NULL' })
  group!: Group;

  @OneToMany(() => Payment, (payment) => payment.student)
  payments!: Payment[];

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances!: Attendance[];
}
