import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderModel } from "domain/order/model/order.model";
import { OrderRepository } from "domain/order/repository/order.repository";
import { OrderEntity } from "../entities/order.entity";

@Injectable()
export class OrderPostgresRepository implements OrderRepository {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>
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
            });
            const savedEntity = await this.orderRepository.save(entity);
            return new OrderModel(
                savedEntity.id,
                savedEntity.productId,
                savedEntity.quantity,
                savedEntity.shippingCost,
                savedEntity.subtotal,
                savedEntity.total,
                savedEntity.createdAt
            );
        } catch (error) {
            throw error;
        }
    }
}
