import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1768188219539 implements MigrationInterface {
    name = 'Migrations1768188219539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "image" character varying NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
