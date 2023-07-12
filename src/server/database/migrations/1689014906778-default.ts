import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1689014906778 implements MigrationInterface {
    name = 'Default1689014906778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" DROP CONSTRAINT "FK_0b9075948d8bf5300c1d152aaae"`);
        await queryRunner.query(`ALTER TABLE "pessoas" RENAME COLUMN "pessoa_id" TO "cidade_id"`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD CONSTRAINT "FK_4fdb381539f405223da533c65b7" FOREIGN KEY ("cidade_id") REFERENCES "cidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" DROP CONSTRAINT "FK_4fdb381539f405223da533c65b7"`);
        await queryRunner.query(`ALTER TABLE "pessoas" RENAME COLUMN "cidade_id" TO "pessoa_id"`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD CONSTRAINT "FK_0b9075948d8bf5300c1d152aaae" FOREIGN KEY ("pessoa_id") REFERENCES "cidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
