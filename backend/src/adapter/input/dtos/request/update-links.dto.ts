export class PersonalDataAuth {
  acceptance_token: string
}

export class EndUserPolicy {
  acceptance_token: string
}

export class UpdateLinksDto {
  personalDataAuth: PersonalDataAuth
  endUserPolicy: EndUserPolicy
}