import { IOrderRepository } from "../repository/order.repository";

export class GetOrderUseCase {
    constructor(
        private readonly orderRepository: IOrderRepository
    ) {}

    async execute(orderId: string) {
        try {
            const order = await this.orderRepository.getOrder(orderId);
            if (!order) {
                throw new Error('Order not found');
            }
            return order;
        } catch (error) {
            throw error;
        }
    }
}