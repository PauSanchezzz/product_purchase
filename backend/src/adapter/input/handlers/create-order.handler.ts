import { CreateOrderUseCase } from "domain/order/application/create-order.use-case";
import { CreateOrderDto } from "../dtos/request/create-order.dto";
import { CreateOrderResponseDto } from "../dtos/response/create-order.response.dto";
import { CreateOrderMapper } from "../mappers/create-order.mapper";
import { Injectable } from "@nestjs/common";
import { GetPrefirmedTokensUseCase } from "domain/prefirmed-tokens/application/get-prefirmed-tokens.use-case";

@Injectable()
export class CreateOrderHandler {
    constructor(
        private readonly createOrderUseCase: CreateOrderUseCase,
        private readonly getPrefirmedTokensUseCase: GetPrefirmedTokensUseCase
    ) {}

    async execute(createOrderDto: CreateOrderDto): Promise<CreateOrderResponseDto> {
        const prefirmedTokens = await this.getPrefirmedTokensUseCase.execute();
        const personalDataAuth = prefirmedTokens.find(token => token.type === 'PERSONAL_DATA_AUTH');
        const endUserPolicy = prefirmedTokens.find(token => token.type === 'END_USER_POLICY');
        if (!personalDataAuth || !endUserPolicy) {
            throw new Error('Personal data auth or end user policy not found');
        }
        const order = await this.createOrderUseCase.execute(
            createOrderDto.productId,
            createOrderDto.quantity
        );
        return CreateOrderMapper.toResponseDto(order, personalDataAuth!, endUserPolicy!);
    }
}
