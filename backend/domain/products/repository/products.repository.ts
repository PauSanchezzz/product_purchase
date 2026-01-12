import { ProductModel } from "../model/product.model";

export abstract class IProductsRepository{
    abstract getProducts(): Promise<ProductModel[]>;    
}