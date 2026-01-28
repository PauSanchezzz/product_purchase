export interface FormCreateOrder {
  productId: number
  quantity: number
}

export interface CreateOrderResponse {
  id: string
  productId: number
  quantity: number
  shippingCost: number
  subtotal: number
  total: number
  iva: number
  createdAt: string
  prefirmedToken: PrefirmedToken
}

export interface PrefirmedToken {
  personalDataAuth: PersonalDataAuth
  endUserPolicy: EndUserPolicy
}

export interface PersonalDataAuth {
  permalink: string
  type: string
  acceptance_token: string
}

export interface EndUserPolicy {
  permalink: string
  type: string
  acceptance_token: string
}

export interface FormUpdatePrefirmedToken {
  personalDataAuth: PersonalDataAuth
  endUserPolicy: EndUserPolicy
}

export interface PersonalDataAuth {
  acceptance_token: string
}

export interface EndUserPolicy {
  acceptance_token: string
}
export interface GetOrderResponse {
  id: string
  productId: string
  productName: string
  quantity: number
  shippingCost: number
  subtotal: number
  total: number
  status: string
  externalPaymentId: string
}
