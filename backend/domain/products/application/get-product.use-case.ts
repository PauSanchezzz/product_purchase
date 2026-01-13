import { ProductModel } from "../model/product.model";
import { IProductsRepository } from "../repository/products.repository";

export class GetProductUseCase {
    constructor(
        private readonly productsRepository: IProductsRepository
    ) {}

    async execute(id: number): Promise<ProductModel> {
        try {
            const product = await this.productsRepository.getProductById(id);
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw error;
        }
    }
}