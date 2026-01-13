import { Controller, Post, Body, Put, Query, Param, Get } from "@nestjs/common";
import { CreateOrderHandler } from "../handlers/create-order.handler";
import { CreateOrderDto } from "../dtos/request/create-order.dto";
import { CreateOrderResponseDto } from "../dtos/response/create-order.response.dto";
import { UpdateLinksHandler } from "../handlers/update-links.handler";
import type { UpdateLinksDto } from "../dtos/request/update-links.dto";
import { GetOrderHandler } from "../handlers/get-order.handler";
import { GetOrderResponseDto } from "../dtos/response/get-order.response.dto";

@Controller('orders')
export class OrderController {
    constructor(
        private readonly createOrderHandler: CreateOrderHandler,
        private readonly updateLinksHandler: UpdateLinksHandler,
        private readonly getOrderHandler: GetOrderHandler
    ) {}

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<CreateOrderResponseDto> {
        try {
            return await this.createOrderHandler.execute(createOrderDto);
        } catch (error) {
            throw error;
        }
    }

    @Put('update-links/:orderId')
    async updateLinks(@Param('orderId') orderId: string, @Body() updateLinksDto: UpdateLinksDto) {
        try {
            return await this.updateLinksHandler.execute(orderId, updateLinksDto);
        } catch (error) {
            throw error;
        }
    }

    @Get(':orderId')
    async getOrder(@Param('orderId') orderId: string): Promise<GetOrderResponseDto> {
        try {
            return await this.getOrderHandler.execute(orderId);
        } catch (error) {
            throw error;
        }
    }
}
