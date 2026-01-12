import { OrderModel } from "../model/order.model";

export abstract class OrderRepository {
    abstract createOrder(order: OrderModel): Promise<OrderModel>
}