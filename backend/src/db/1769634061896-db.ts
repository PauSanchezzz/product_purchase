import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1769634061896 implements MigrationInterface {
    name = 'Db1769634061896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "iva" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "iva"`);
    }

}
