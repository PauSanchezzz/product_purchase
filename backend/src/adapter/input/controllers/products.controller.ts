import { Controller, Get } from "@nestjs/common";
import { GetProductsHandler } from "../handlers/get-products.handler";
import { GetProductsResponseDto } from "../dtos/response/get-products.response.dto";

@Controller('products')
export class ProductsController {
    constructor(private readonly getProductsHandler: GetProductsHandler) {}

    @Get()
    async getProducts(): Promise<GetProductsResponseDto> {
        try {
            return this.getProductsHandler.execute()
        } catch (error) {
            throw error
        }
    }
}