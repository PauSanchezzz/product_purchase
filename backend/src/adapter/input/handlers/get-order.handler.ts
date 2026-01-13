import { GetOrderUseCase } from "domain/order/application/get-order.use-case";
import { GetOrderMapper } from "../mappers/get-order.mapper";
import { GetOrderResponseDto } from "../dtos/response/get-order.response.dto";

export class GetOrderHandler {
    constructor(
        private readonly getOrderUseCase: GetOrderUseCase
    ) {}

    async execute(orderId: string): Promise<GetOrderResponseDto> {
        try {
            const order = await this.getOrderUseCase.execute(orderId);
            return GetOrderMapper.toResponseDto(order);
        } catch (error) {
            throw error;
        }
    }
}