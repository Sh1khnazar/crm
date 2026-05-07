import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Student } from '../../students/entities/student.entity';

export enum PaymentType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity('payments')
export class Payment extends BaseEntity {
  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  amount!: number;

  @Column({ type: 'enum', enum: PaymentType })
  type!: PaymentType;

  @Column({ nullable: true })
  comment?: string;

  @ManyToOne(() => Student, (student) => student.payments, {
    onDelete: 'CASCADE',
  })
  student!: Student;
}
