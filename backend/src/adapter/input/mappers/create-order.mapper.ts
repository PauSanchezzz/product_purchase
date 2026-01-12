import { OrderModel } from "domain/order/model/order.model";
import { CreateOrderResponseDto } from "../dtos/response/create-order.response.dto";
import { PrefirmedTokenModel } from "domain/prefirmed-tokens/model/prefirmed-tokens.model";

export abstract class CreateOrderMapper {
    static toResponseDto(order: OrderModel, personalDataAuth: PrefirmedTokenModel, endUserPolicy: PrefirmedTokenModel): CreateOrderResponseDto {
        return {
            id: order.id,
            productId: order.productId,
            quantity: order.quantity,
            shippingCost: order.shippingCost,
            subtotal: order.subtotal,
            total: order.total,
            createdAt: order.createdAt || new Date(),
            prefirmedToken: {
                personalDataAuth: personalDataAuth,
                endUserPolicy: endUserPolicy
            }
        }
    }
}
