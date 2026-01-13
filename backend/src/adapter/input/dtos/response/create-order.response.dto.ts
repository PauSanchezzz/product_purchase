import { TypePrefirmedTokensResponseDto } from "./get-prefirmed-tokens.response.dto";

export class CreateOrderResponseDto {
    id: string;
    productId: number;
    quantity: number;
    shippingCost: number;
    subtotal: number;
    total: number;
    createdAt: Date;
    status: string;
    shippingInformation?: any;
    prefirmedToken: TypePrefirmedTokensResponseDto;
}
