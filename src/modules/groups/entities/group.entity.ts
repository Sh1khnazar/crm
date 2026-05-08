import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';
import { Student } from '../../students/entities/student.entity';
import { User } from '../../users/entities/user.entity';

@Entity('groups')
export class Group extends BaseEntity {
  @ApiProperty({ example: 'Backend' })
  @Column()
  direction!: string;

  // TUZATISH: teacher_name, teacher_phone, teacher_photo migration bilan qo'shilgan
  @ApiProperty({ example: 'Muxamadiyev Ibroxim' })
  @Column()
  teacher_name!: string;

  @ApiProperty({ example: '+998900113861' })
  @Column()
  teacher_phone!: string;

  @ApiProperty({ example: 'https://photo.link', nullable: true })
  @Column({ nullable: true })
  teacher_photo?: string;

  // --- O'qituvchi (User) bilan bog'liqlik ---
  @ManyToOne(() => User, (user) => user.groups, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher?: User;

  @ApiProperty({ example: 'uuid-teacher-id', nullable: true })
  @Column({ name: 'teacher_id', nullable: true })
  teacher_id?: string;

  @ApiProperty({ example: 'DU-CHOR-JUMA' })
  @Column()
  lesson_days!: string;

  @ApiProperty({ example: '14:00-16:00' })
  @Column()
  time!: string;

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
  students?: Student[];

  @OneToMany(() => Attendance, (attendance) => attendance.group)
  attendances?: Attendance[];
}
