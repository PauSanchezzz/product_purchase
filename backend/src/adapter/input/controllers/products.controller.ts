import { Controller, Get, Param } from "@nestjs/common";
import { GetProductsHandler } from "../handlers/get-products.handler";
import { GetProductResponseDto, GetProductsResponseDto } from "../dtos/response/get-products.response.dto";
import { GetProductHandler } from "../handlers/get-product.handler";

@Controller('products')
export class ProductsController {
    constructor(private readonly getProductsHandler: GetProductsHandler,
        private readonly getProductHandler: GetProductHandler) {}

    @Get()
    async getProducts(): Promise<GetProductsResponseDto> {
        try {
            return this.getProductsHandler.execute()
        } catch (error) {
            throw error
        }
    }

    @Get(':id')
    async getProductById(@Param('id') id: number): Promise<GetProductResponseDto> {
        try {
            return this.getProductHandler.execute(id)
        } catch (error) {
            throw error
        }
    }
}