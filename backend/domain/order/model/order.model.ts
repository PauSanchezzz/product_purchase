import { PrefirmedTokenModel } from "domain/prefirmed-tokens/model/prefirmed-tokens.model";
import { OrderStatus } from "./order-status.enum";
import { ShippingInformationModel } from "domain/shipping/model/shipping.model";

export class OrderModel {
    constructor(
        public readonly id: string,
        public readonly productId: number,
        public readonly quantity: number,
        public readonly shippingCost: number,
        public readonly subtotal: number,
        public readonly total: number,
        public readonly iva?: number,
        public readonly createdAt?: Date,
        public  status: OrderStatus = OrderStatus.PENDING,
        public  externalPaymentId?: string,
        public  shippingInformation?: ShippingInformationModel,
        public readonly personalDataAuthToken?: string,
        public readonly endUserPolicyToken?: string,
        public readonly productName?: string,
    ) {}
}