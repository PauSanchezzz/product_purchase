import { OrderModel } from "../model/order.model";

export abstract class OrderRepository {
    abstract createOrder(order: OrderModel): Promise<OrderModel>
    abstract updateLinksOrder(orderId: string, personalDataAuthToken: string, endUserPolicyToken: string)
    abstract getOrder(orderId: string): Promise<OrderModel>
}