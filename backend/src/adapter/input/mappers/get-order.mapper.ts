import { OrderModel } from "domain/order/model/order.model";
import { GetOrderResponseDto } from "../dtos/response/get-order.response.dto";

export abstract class GetOrderMapper {
    static toResponseDto(order: OrderModel): GetOrderResponseDto {
        return {
            id: order.id,
            productId: order.productId.toString(),
            productName: order.productName || 'Unknown Product',
            quantity: order.quantity,
            shippingCost: order.shippingCost,
            subtotal: order.subtotal,
            total: order.total,
            status: order.status,
            externalPaymentId: order.externalPaymentId || '',
            shippingInformation: order.shippingInformation
        }
    }
}
