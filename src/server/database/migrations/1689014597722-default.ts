import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1689014597722 implements MigrationInterface {
    name = 'Default1689014597722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" DROP CONSTRAINT "PK_fa8104cfc91dc207880a73a1acd"`);
        await queryRunner.query(`ALTER TABLE "pessoas" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD CONSTRAINT "PK_fa8104cfc91dc207880a73a1acd" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" DROP CONSTRAINT "PK_fa8104cfc91dc207880a73a1acd"`);
        await queryRunner.query(`ALTER TABLE "pessoas" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD CONSTRAINT "PK_fa8104cfc91dc207880a73a1acd" PRIMARY KEY ("id")`);
    }

}
