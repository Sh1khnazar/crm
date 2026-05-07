import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Attendance } from '../modules/attendance/entities/attendance.entity';
import { Group } from '../modules/groups/entities/group.entity';
import { Lead } from '../modules/leads/entities/lead.entity'; // <--- Buni qo'shdik
import { Payment } from '../modules/payments/entities/payment.entity';
import { Student } from '../modules/students/entities/student.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // Barcha entitylarni ro'yxatga olamiz
  entities: [Student, Group, Attendance, Payment, Lead],

  // Migratsiya fayllari qayerda saqlanishi
  migrations: ['src/database/migrations/*{.ts,.js}'],

  synchronize: false,
  logging: true,
});
