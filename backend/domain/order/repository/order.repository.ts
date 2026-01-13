import { OrderModel } from "../model/order.model";

export abstract class IOrderRepository {
    abstract createOrder(order: OrderModel): Promise<OrderModel>
    abstract updateLinksOrder(orderId: string, personalDataAuthToken: string, endUserPolicyToken: string)
    abstract updateOrder(order: OrderModel): Promise<OrderModel>
    abstract getOrder(orderId: string): Promise<OrderModel>
}