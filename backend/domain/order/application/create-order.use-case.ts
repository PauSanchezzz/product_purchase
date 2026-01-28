import { OrderModel } from "../model/order.model";
import { IOrderRepository } from "../repository/order.repository";
import { IProductsRepository } from "domain/products/repository/products.repository";
import { v4 as uuidv4 } from 'uuid';

export class CreateOrderUseCase {
    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly productRepository: IProductsRepository
    ) {}


    async execute(
        productId: number, 
        quantity: number,
        shippingInformation: any,
        personalDataAuthToken: string,
        endUserPolicyToken: string
    ): Promise<OrderModel> {

        const product = await this.productRepository.getProductById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const shippingCost = Math.floor(Math.random() * (12000 - 3000 + 1)) + 3000;
        const subtotal = product.price * quantity;
        const iva = subtotal * 0.19;
        const total = subtotal + shippingCost + iva;
        const id = uuidv4();

        const order = new OrderModel(
            id,
            productId,
            quantity,
            shippingCost,
            subtotal,
            total,
            iva,
            undefined, // createdAt
            undefined, // status (default)
            undefined, // externalPaymentId
            shippingInformation,
            personalDataAuthToken,
            endUserPolicyToken
        );

        return await this.orderRepository.createOrder(order);
    }
}
