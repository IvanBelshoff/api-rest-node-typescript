import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688754294881 implements MigrationInterface {
    name = 'Default1688754294881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cidades" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "cidades" ADD "nome" character varying(150) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cidades"."nome" IS 'Tabela usada para armazenar cidades do sistema'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "cidades"."nome" IS 'Tabela usada para armazenar cidades do sistema'`);
        await queryRunner.query(`ALTER TABLE "cidades" DROP COLUMN "nome"`);
        await queryRunner.query(`ALTER TABLE "cidades" ADD "nome" text NOT NULL`);
    }

}
