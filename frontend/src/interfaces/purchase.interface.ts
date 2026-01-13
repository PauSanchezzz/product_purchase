export interface Product {
  name: string
  price: number
  quantity: number
}
export interface terms {
  personalDataAuth: boolean
  endUserPolicy: boolean
}
export interface Shipping {
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}
export interface Payment {
  cardNumber: string
  cardHolder: string
  cardExpirationDate: string
  cardCvv: string
}
