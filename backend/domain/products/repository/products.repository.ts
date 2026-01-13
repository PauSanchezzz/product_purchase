import { ProductModel } from "../model/product.model";

export abstract class IProductsRepository{
    abstract getProducts(): Promise<ProductModel[]>;    
    abstract getProductById(id: number): Promise<ProductModel | null>;
    abstract updateProductStock(id: number, stock: number): Promise<ProductModel>;
}