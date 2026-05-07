import type { MigrationInterface, QueryRunner } from 'typeorm';
export class InitialSchema1778180669909 implements MigrationInterface {
  name = 'InitialSchema1778180669909';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "leads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "full_name" character varying NOT NULL, "phone" character varying NOT NULL, "comment" text, "status" character varying NOT NULL DEFAULT 'new', CONSTRAINT "PK_cd102ed7a9a4ca7d4d8bfeba406" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "groups" ADD "teacher_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD "teacher_phone" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD "teacher_photo" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD "lesson_days" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "lesson_days"`);
    await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "teacher_photo"`);
    await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "teacher_phone"`);
    await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "teacher_name"`);
    await queryRunner.query(
      `ALTER TABLE "groups" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "leads"`);
  }
}
