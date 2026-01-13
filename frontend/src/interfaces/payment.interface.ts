export interface FormCreatePayment {
  card: Card
  orderId: string
  shippingInformation: ShippingInformation
}

export interface Card {
  number: string
  cvc: string
  exp_month: string
  exp_year: string
  card_holder: string
}

export interface ShippingInformation {
  customer: string
  customerEmail: string
  address: string
  country: string
  region: string
  city: string
  postalCode: string
  phone: string
}
