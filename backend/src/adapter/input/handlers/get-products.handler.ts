import { GetProductsUseCase } from "domain/products/application/get-products.use-case";
import { GetProductsResponseDto } from "../dtos/response/get-products.response.dto";
import { GetProductsMapper } from "../mappers/get-products.mapper";

export class GetProductsHandler {
    constructor(
        private readonly getProductsUseCase: GetProductsUseCase
    ) {}
    
    async execute(): Promise<GetProductsResponseDto> {
        const data = await this.getProductsUseCase.execute()
        return GetProductsMapper.toResponseDto(data)
    }
}