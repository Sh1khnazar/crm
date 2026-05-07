import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Group } from '../../groups/entities/group.entity';
import { Student } from '../../students/entities/student.entity';

@Entity('attendance')
export class Attendance extends BaseEntity {
  @Column({ type: 'date' })
  date!: string;

  @Column({ default: true })
  is_present!: boolean;

  @Column({ nullable: true })
  reason?: string; // Kelmagan bo'lsa sababi

  @ManyToOne(() => Student, (student) => student.id, { onDelete: 'CASCADE' })
  student!: Student;

  @ManyToOne(() => Group, (group) => group.id, { onDelete: 'CASCADE' })
  group!: Group;
}
