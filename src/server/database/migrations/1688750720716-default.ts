/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688750720716 implements MigrationInterface {
    // eslint-disable-next-line semi
    name = 'Default1688750720716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cidades" ("id" BIGSERIAL NOT NULL, "nome" text NOT NULL, CONSTRAINT "PK_cc606d4fea4335e32bd19f3a9fa" PRIMARY KEY ("id")); COMMENT ON COLUMN "cidades"."nome" IS 'Tabela usada para armazenar cidades do sistema'`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "sobrenome" text NOT NULL, "email" text NOT NULL, "login" text NOT NULL, "senha" text NOT NULL, "data_criacao" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "UQ_0c0fcf4a8c228628476a29ea302" UNIQUE ("login"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "cidades"`);
    }

}
