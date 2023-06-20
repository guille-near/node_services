import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1687281032249 implements MigrationInterface {
    name = 'Migration1687281032249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscribe" DROP CONSTRAINT "PK_3e91e772184cd3feb30688ef1b8"`);
        await queryRunner.query(`ALTER TABLE "subscribe" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "subscribe" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "subscribe" ADD CONSTRAINT "PK_3e91e772184cd3feb30688ef1b8" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscribe" DROP CONSTRAINT "PK_3e91e772184cd3feb30688ef1b8"`);
        await queryRunner.query(`ALTER TABLE "subscribe" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "subscribe" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subscribe" ADD CONSTRAINT "PK_3e91e772184cd3feb30688ef1b8" PRIMARY KEY ("id")`);
    }

}
