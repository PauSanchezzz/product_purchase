import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrdersTable1768195000000 implements MigrationInterface {
    name = 'UpdateOrdersTable1768195000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "orders" 
            ADD COLUMN "status" character varying NOT NULL DEFAULT 'PENDING',
            ADD COLUMN "externalPaymentId" character varying,
            ADD COLUMN "personalDataAuthToken" character varying,
            ADD COLUMN "endUserPolicyToken" character varying,
            ADD COLUMN "shippingInformation" jsonb
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "orders" 
            DROP COLUMN "status",
            DROP COLUMN "externalPaymentId",
            DROP COLUMN "personalDataAuthToken",
            DROP COLUMN "endUserPolicyToken",
            DROP COLUMN "shippingInformation"
        `);
    }

}
