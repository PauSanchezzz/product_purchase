import { ProductModel } from "domain/products/model/product.model";
import { IProductsRepository } from "domain/products/repository/products.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../entities/product.entity";

@Injectable()
export class ProductsPostgresRepository implements IProductsRepository {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) {}

    async getProducts(): Promise<ProductModel[]> {
        try {
            return await this.productRepository.find()
        } catch (error) {
            throw error
        }
    }

    async getProductById(id: number): Promise<ProductModel | null> {
        try {
            const product = await this.productRepository.findOne({ where: { id } })
            if (!product) {
                throw new Error('Product not found')
            }
            return product
        } catch (error) {
            throw error
        }
    }
    
}