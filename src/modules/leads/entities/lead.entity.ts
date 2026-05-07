import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('leads')
export class Lead extends BaseEntity {
  @ApiProperty({ example: 'Muxamadiyev Ibroxim' })
  @Column()
  full_name!: string;

  @ApiProperty({ example: '+998900113861' })
  @Column()
  phone!: string;

  @ApiProperty({ example: 'Izoh' })
  @Column({ type: 'text', nullable: true })
  comment!: string;

  @ApiProperty({ example: 'new' })
  @Column({ default: 'new' })
  status!: string;
}
