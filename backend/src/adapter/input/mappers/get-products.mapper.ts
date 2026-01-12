import { ProductModel } from "domain/products/model/product.model";
import { GetProductsResponseDto } from "../dtos/response/get-products.response.dto";

export abstract class GetProductsMapper {
 static toResponseDto(products: ProductModel[]): GetProductsResponseDto {
    return {
        productsList: products.map(product => ({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            stock: product.stock,
            description: product.description,
        }))
    }
 }   
}