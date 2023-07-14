/* eslint-disable semi */
/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1689347733470 implements MigrationInterface {
    name = 'Default1689347733470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pessoas" ("id" BIGSERIAL NOT NULL, "nome" text NOT NULL, "sobrenome" text NOT NULL, "email" text NOT NULL, "cidade_id" bigint, CONSTRAINT "UQ_7ceb74dc9f2caea4eae596ab6aa" UNIQUE ("email"), CONSTRAINT "PK_fa8104cfc91dc207880a73a1acd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cidades" ("id" BIGSERIAL NOT NULL, "nome" character varying(150) NOT NULL, CONSTRAINT "PK_cc606d4fea4335e32bd19f3a9fa" PRIMARY KEY ("id")); COMMENT ON COLUMN "cidades"."nome" IS 'Tabela usada para armazenar cidades do sistema'`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "sobrenome" text NOT NULL, "email" text NOT NULL, "senha" text NOT NULL, "data_criacao" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pessoas" ADD CONSTRAINT "FK_4fdb381539f405223da533c65b7" FOREIGN KEY ("cidade_id") REFERENCES "cidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pessoas" DROP CONSTRAINT "FK_4fdb381539f405223da533c65b7"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "cidades"`);
        await queryRunner.query(`DROP TABLE "pessoas"`);
    }

}
