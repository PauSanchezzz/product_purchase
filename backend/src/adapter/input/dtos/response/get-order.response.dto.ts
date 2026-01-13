export interface GetOrderResponseDto {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    shippingCost: number;
    subtotal: number;
    total: number;
    status: string;
    externalPaymentId: string;
    shippingInformation: any;
}