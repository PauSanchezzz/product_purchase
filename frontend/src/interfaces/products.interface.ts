export interface GetProductsResponse {
  productsList: Product[]
}

export interface GetProductResponse {
  product: Product
}

export interface Product {
  id: number
  name: string
  image: string
  price: number
  stock: number
  description: string
}
