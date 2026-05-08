import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1778180669909 implements MigrationInterface {
  name = 'InitialSchema1778180669909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // UUID extension
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Roles enum
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'teacher', 'superadmin')`,
    );

    // Users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "full_name" character varying NOT NULL,
        "phone" character varying NOT NULL,
        "password" character varying NOT NULL,
        "role" "public"."users_role_enum" NOT NULL DEFAULT 'teacher',
        CONSTRAINT "UQ_users_phone" UNIQUE ("phone"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);

    // Groups table
    await queryRunner.query(`
      CREATE TABLE "groups" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "direction" character varying NOT NULL,
        "teacher_name" character varying NOT NULL,
        "teacher_phone" character varying NOT NULL,
        "teacher_photo" character varying,
        "teacher_id" uuid,
        "lesson_days" character varying NOT NULL,
        "time" character varying NOT NULL,
        "lesson_price" numeric(12,2) NOT NULL DEFAULT '50000',
        CONSTRAINT "PK_groups" PRIMARY KEY ("id")
      )
    `);

    // Students table
    await queryRunner.query(`
      CREATE TABLE "students" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "full_name" character varying NOT NULL,
        "phone" character varying NOT NULL,
        "direction" character varying NOT NULL,
        "parent_name" character varying NOT NULL,
        "parent_phone" character varying NOT NULL,
        "photo" character varying,
        "balance" numeric(12,2) NOT NULL DEFAULT '0',
        "groupId" uuid,
        CONSTRAINT "UQ_students_phone" UNIQUE ("phone"),
        CONSTRAINT "PK_students" PRIMARY KEY ("id")
      )
    `);

    // Payments enum
    await queryRunner.query(
      `CREATE TYPE "public"."payments_type_enum" AS ENUM('income', 'expense')`,
    );

    // Payments table
    await queryRunner.query(`
      CREATE TABLE "payments" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "amount" numeric(12,2) NOT NULL,
        "type" "public"."payments_type_enum" NOT NULL,
        "comment" character varying,
        "studentId" uuid,
        CONSTRAINT "PK_payments" PRIMARY KEY ("id")
      )
    `);

    // Attendances table
    await queryRunner.query(`
      CREATE TABLE "attendances" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "date" date NOT NULL,
        "is_present" boolean NOT NULL DEFAULT true,
        "reason" character varying,
        "studentId" uuid NOT NULL,
        "groupId" uuid NOT NULL,
        CONSTRAINT "PK_attendances" PRIMARY KEY ("id")
      )
    `);

    // Leads table
    await queryRunner.query(`
      CREATE TABLE "leads" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "full_name" character varying NOT NULL,
        "phone" character varying NOT NULL,
        "comment" text,
        "status" character varying NOT NULL DEFAULT 'new',
        CONSTRAINT "PK_leads" PRIMARY KEY ("id")
      )
    `);

    // Foreign keys
    await queryRunner.query(`
      ALTER TABLE "groups"
        ADD CONSTRAINT "FK_groups_teacher"
        FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE SET NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "students"
        ADD CONSTRAINT "FK_students_group"
        FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE SET NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "payments"
        ADD CONSTRAINT "FK_payments_student"
        FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "attendances"
        ADD CONSTRAINT "FK_attendances_student"
        FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "attendances"
        ADD CONSTRAINT "FK_attendances_group"
        FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_attendances_group"`);
    await queryRunner.query(`ALTER TABLE "attendances" DROP CONSTRAINT "FK_attendances_student"`);
    await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_payments_student"`);
    await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_students_group"`);
    await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_groups_teacher"`);
    await queryRunner.query(`DROP TABLE "leads"`);
    await queryRunner.query(`DROP TABLE "attendances"`);
    await queryRunner.query(`DROP TYPE "public"."payments_type_enum"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TABLE "students"`);
    await queryRunner.query(`DROP TABLE "groups"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
