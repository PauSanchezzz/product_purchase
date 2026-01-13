import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderModel } from "domain/order/model/order.model";
import { OrderRepository } from "domain/order/repository/order.repository";
import { OrderEntity } from "../entities/order.entity";
import { UpdateLinksDto } from "src/adapter/input/dtos/request/update-links.dto";

@Injectable()
export class OrderPostgresRepository implements OrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
    ) {}

    async createOrder(order: OrderModel): Promise<OrderModel> {
        try {
            const entity = this.orderRepository.create({
                id: order.id,
                productId: order.productId,
                quantity: order.quantity,
                shippingCost: order.shippingCost,
                subtotal: order.subtotal,
                total: order.total,
                status: order.status,
                externalPaymentId: order.externalPaymentId,
            });
            return await this.orderRepository.save(entity);
        } catch (error) {
            throw error;
        }
    }

    async updateLinksOrder(orderId: string, updateLinksDto: UpdateLinksDto) {
        const order = await this.orderRepository.findOneBy({ id: orderId });
        if (!order) {
            throw new Error('Order not found');
        }
        order.personalDataAuthToken = updateLinksDto.personalDataAuth.acceptance_token;
        order.endUserPolicyToken = updateLinksDto.endUserPolicy.acceptance_token;
        return this.orderRepository.save(order);
    }

    async getOrder(orderId: string): Promise<OrderModel> {
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: ['product', 'shipping']
        });

        if (!order) {
            throw new Error('Order not found');
        }

        return new OrderModel(
            order.id,
            order.productId,
            order.quantity,
            order.shippingCost,
            order.subtotal,
            order.total,
            order.createdAt,
            order.status,
            order.externalPaymentId,
            order.shipping,
            order.personalDataAuthToken,
            order.endUserPolicyToken,
            order.product?.name
        );
    }
}
