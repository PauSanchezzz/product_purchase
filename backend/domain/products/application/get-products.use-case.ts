import { ProductModel } from "../model/product.model";
import { IProductsRepository } from "../repository/products.repository";

export class GetProductsUseCase {
    constructor(
        private readonly productsRepository: IProductsRepository
    ) {}

    async execute(): Promise<ProductModel[]> {
        try {
            return await this.productsRepository.getProducts();
        } catch (error) {
            throw error;
        }
    }
}