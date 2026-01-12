import { CreateOrderUseCase } from "domain/order/application/create-order.use-case";
import { CreateOrderDto } from "../dtos/request/create-order.dto";
import { CreateOrderResponseDto } from "../dtos/response/create-order.response.dto";
import { CreateOrderMapper } from "../mappers/create-order.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateOrderHandler {
    constructor(
        private readonly createOrderUseCase: CreateOrderUseCase
    ) {}

    async execute(createOrderDto: CreateOrderDto): Promise<CreateOrderResponseDto> {
        const order = await this.createOrderUseCase.execute(
            createOrderDto.productId,
            createOrderDto.quantity
        );
        return CreateOrderMapper.toResponseDto(order);
    }
}
