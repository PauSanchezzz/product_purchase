import { ProductModel } from "domain/products/model/product.model";
import { GetProductResponseDto } from "../dtos/response/get-products.response.dto";

export abstract class GetProductMapper {
 static toResponseDto(product: ProductModel): GetProductResponseDto {
    return {
        product: {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            stock: product.stock,
            description: product.description,
        }
    }
 }   
}