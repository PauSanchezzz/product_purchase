import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrdersTable1768190300000 implements MigrationInterface {
    name = 'CreateOrdersTable1768190300000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" uuid NOT NULL, 
                "productId" integer NOT NULL, 
                "quantity" integer NOT NULL, 
                "shippingCost" integer NOT NULL, 
                "subtotal" integer NOT NULL, 
                "total" integer NOT NULL, 
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "PK_orders" PRIMARY KEY ("id"),
                CONSTRAINT "FK_orders_products" FOREIGN KEY ("productId") REFERENCES "products"("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
