import { Controller, Post, Body, Put, Query, Param, Get, HttpException } from "@nestjs/common";
import { CreateOrderHandler } from "../handlers/create-order.handler";
import { CreateOrderDto } from "../dtos/request/create-order.dto";
import { CreateOrderResponseDto } from "../dtos/response/create-order.response.dto";
import { UpdateLinksHandler } from "../handlers/update-links.handler";
import { UpdateLinksDto } from "../dtos/request/update-links.dto";
import { GetOrderHandler } from "../handlers/get-order.handler";
import { GetOrderResponseDto } from "../dtos/response/get-order.response.dto";
import { PostPaymentHandler } from "../handlers/post-payment.handler";
import { PaymentRequestDto } from "../dtos/request/payment.request.dto";

@Controller('orders')
export class OrderController {
    constructor(
        private readonly createOrderHandler: CreateOrderHandler,
        private readonly updateLinksHandler: UpdateLinksHandler,
        private readonly getOrderHandler: GetOrderHandler,
        private readonly postPaymentHandler: PostPaymentHandler
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

    @Post('payment')
    async payment(@Body() paymentDto: PaymentRequestDto) {
        try {
            return await this.postPaymentHandler.execute(paymentDto);
        } catch (error) {
            throw new HttpException(error, 400);
        }
    }


}
