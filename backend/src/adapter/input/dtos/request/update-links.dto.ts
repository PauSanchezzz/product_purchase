export interface UpdateLinksDto {
 personalDataAuth: PersonalDataAuth
  endUserPolicy: EndUserPolicy
}

export interface PersonalDataAuth {
  acceptance_token: string
}

export interface EndUserPolicy {
  acceptance_token: string
}