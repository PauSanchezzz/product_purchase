export class OrderModel {
    constructor(
        public readonly id: string,
        public readonly productId: number,
        public readonly quantity: number,
        public readonly shippingCost: number,
        public readonly subtotal: number,
        public readonly total: number,
        public readonly createdAt?: Date,
    ) {}
}