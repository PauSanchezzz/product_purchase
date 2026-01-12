import { OrderModel } from "domain/order/model/order.model";
import { CreateOrderResponseDto } from "../dtos/response/create-order.response.dto";

export abstract class CreateOrderMapper {
    static toResponseDto(order: OrderModel): CreateOrderResponseDto {
        return {
            id: order.id,
            productId: order.productId,
            quantity: order.quantity,
            shippingCost: order.shippingCost,
            subtotal: order.subtotal,
            total: order.total,
            createdAt: order.createdAt || new Date(),
        }
    }
}
