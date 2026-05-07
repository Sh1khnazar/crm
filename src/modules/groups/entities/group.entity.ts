import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';
import { Student } from '../../students/entities/student.entity';

@Entity('groups')
export class Group extends BaseEntity {
  @ApiProperty({ example: 'Backend' })
  @Column()
  direction!: string; // Figma: Matematika, Ona-tili...

  @ApiProperty({ example: 'Muxamadiyev Ibroxim' })
  @Column()
  teacher_name!: string; // Figma: O'qituvchi ismi

  @ApiProperty({ example: '+998900113861' })
  @Column()
  teacher_phone!: string; // Figma: Tel raqam

  @ApiProperty({ example: 'https://cdn.com/avatar.jpg', required: false })
  @Column({ nullable: true })
  teacher_photo!: string; // Figma: O'qituvchi rasmi

  @ApiProperty({ example: 'DU-CHOR-JUMA' })
  @Column()
  lesson_days!: string; // Figma: Dars kunlari

  @ApiProperty({ example: '14:00-16:00' })
  @Column()
  time!: string; // Figma: Dars vaqti

  @ApiProperty({ example: 50000, description: 'Bitta darsning narxi' })
  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 50000,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  lesson_price!: number;

  @OneToMany(() => Student, (student) => student.group)
  students!: Student[];

  @OneToMany(() => Attendance, (attendance) => attendance.group)
  attendances!: Attendance[];
}
