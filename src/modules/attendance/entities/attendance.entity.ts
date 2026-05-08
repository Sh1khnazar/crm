import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Group } from '../../groups/entities/group.entity';
import { Student } from '../../students/entities/student.entity';

@Entity('attendances')
export class Attendance extends BaseEntity {
  @ApiProperty({ example: '2026-05-08' })
  @Column({ type: 'date' })
  date!: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  is_present!: boolean;

  @ApiProperty({ example: 'Kasalligi sababli', required: false })
  @Column({ nullable: true })
  reason?: string; // Kelmagan bo'lsa sababi

  // --- Student bog'liqligi ---
  @Column()
  studentId!: string;

  @ManyToOne(() => Student, (student) => student.attendances, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studentId' })
  student!: Student;

  // --- Group bog'liqligi ---
  @Column()
  groupId!: string;

  @ManyToOne(() => Group, (group) => group.attendances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group!: Group;
}
