import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { UserRole } from '../../../common/enums/role.enum';
import { Group } from '../../groups/entities/group.entity';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ example: 'Sotimov Shixnazar' })
  @Column()
  full_name!: string;

  @ApiProperty({ example: '+998901234567' })
  @Column({ unique: true })
  phone!: string;

  // select: false - parol odatda qaytarilmaydi
  @Column({ select: false })
  password!: string;

  @ApiProperty({ enum: UserRole, example: UserRole.TEACHER })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.TEACHER })
  role!: UserRole;

  @OneToMany(() => Group, (group) => group.teacher)
  groups?: Group[];
}
