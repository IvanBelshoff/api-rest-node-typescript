import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1689013569120 implements MigrationInterface {
    name = 'Default1689013569120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pessoas" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "sobrenome" text NOT NULL, "email" text NOT NULL, "pessoa_id" bigint, CONSTRAINT "UQ_7ceb74dc9f2caea4eae596ab6aa" UNIQUE ("email"), CONSTRAINT "PK_fa8104cfc91dc207880a73a1acd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD CONSTRAINT "FK_0b9075948d8bf5300c1d152aaae" FOREIGN KEY ("pessoa_id") REFERENCES "cidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" DROP CONSTRAINT "FK_0b9075948d8bf5300c1d152aaae"`);
        await queryRunner.query(`DROP TABLE "pessoas"`);
    }

}
