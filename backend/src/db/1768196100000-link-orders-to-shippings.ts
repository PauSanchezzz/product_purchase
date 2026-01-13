import { MigrationInterface, QueryRunner } from "typeorm";

export class LinkOrdersToShippings1768196100000 implements MigrationInterface {
    name = 'LinkOrdersToShippings1768196100000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "orders" DROP COLUMN "shippingInformation"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" ADD COLUMN "shippingId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" ADD CONSTRAINT "FK_orders_shipping" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_orders_shipping"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP COLUMN "shippingId"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" ADD COLUMN "shippingInformation" jsonb
        `);
    }

}
