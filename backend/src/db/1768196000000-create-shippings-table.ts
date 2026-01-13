import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateShippingsTable1768196000000 implements MigrationInterface {
    name = 'CreateShippingsTable1768196000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "shippings" (
                "id" SERIAL NOT NULL,
                "customer" character varying NOT NULL,
                "customerEmail" character varying NOT NULL,
                "address" character varying NOT NULL,
                "country" character varying NOT NULL,
                "region" character varying NOT NULL,
                "city" character varying NOT NULL,
                "postalCode" character varying NOT NULL,
                "phone" character varying NOT NULL,
                CONSTRAINT "PK_shippings" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shippings"`);
    }

}
