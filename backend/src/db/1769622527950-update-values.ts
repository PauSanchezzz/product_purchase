import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1769622527950 implements MigrationInterface {
    name = 'Db1769622527950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_orders_products"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_orders_shipping"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_fa7fbee142ce934fec2862889ac" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_8624dad595ae567818ad9983b33" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`UPDATE "products" SET "stock" = "stock" * 10`);
        await queryRunner.query(`UPDATE "products" SET "price" = "price" * 10000`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_8624dad595ae567818ad9983b33"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_fa7fbee142ce934fec2862889ac"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_orders_shipping" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_orders_products" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`UPDATE "products" SET "stock" = "stock" / 10`);
        await queryRunner.query(`UPDATE "products" SET "price" = "price" / 10000`);
    }

}
