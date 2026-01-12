import { Controller, Post, Body } from "@nestjs/common";
import { CreateOrderHandler } from "../handlers/create-order.handler";
import { CreateOrderDto } from "../dtos/request/create-order.dto";
import { CreateOrderResponseDto } from "../dtos/response/create-order.response.dto";

@Controller('orders')
export class OrderController {
    constructor(
        private readonly createOrderHandler: CreateOrderHandler
    ) {}

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<CreateOrderResponseDto> {
        try {
            return await this.createOrderHandler.execute(createOrderDto);
        } catch (error) {
            throw error;
        }
    }
}
