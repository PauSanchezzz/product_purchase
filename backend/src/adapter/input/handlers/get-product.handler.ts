import { GetProductUseCase } from "domain/products/application/get-product.use-case";
import { GetProductResponseDto } from "../dtos/response/get-products.response.dto";
import { GetProductMapper } from "../mappers/get-product.mapper";

export class GetProductHandler {
    constructor(
        private readonly getProductUseCase: GetProductUseCase
    ) {}
    
    async execute(id: number): Promise<GetProductResponseDto> {
        const data = await this.getProductUseCase.execute(id)
        return GetProductMapper.toResponseDto(data)
    }
}