export class CreateOrderResponseDto {
    id: string;
    productId: number;
    quantity: number;
    shippingCost: number;
    subtotal: number;
    total: number;
    createdAt: Date;
}
