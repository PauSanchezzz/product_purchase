import { ProductModel } from "domain/products/model/product.model";

export interface GetProductsResponseDto {
    productsList: ProductModel[]
}
export interface GetProductResponseDto {
    product: ProductModel
}