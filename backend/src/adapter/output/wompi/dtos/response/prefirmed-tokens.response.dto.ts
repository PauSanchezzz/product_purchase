import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class GetPrefirmedTokensResponseDto {
  data: Data;
  meta: Meta;
}

export class Data {
  id?: number;
  name?: string;
  email?: string;
  contact_name?: string;
  phone_number?: string;
  active?: boolean;
  logo_url?: null;
  legal_name?: string;
  legal_id_type?: string;
  legal_id?: string;
  public_key?: string;
  accepted_currencies?: string[];
  fraud_javascript_key?: null;
  fraud_groups?: any[];
  accepted_payment_methods?: string[];
  payment_methods?: PaymentMethod[];
  @IsNotEmpty()
  @IsObject()
  presigned_acceptance: PresignedAcceptance;
  @IsNotEmpty()
  @IsObject()
  presigned_personal_data_auth: PresignedPersonalDataAuth;
  click_to_pay_dpa_id: any;
  mcc: any; 
  acquirer_id: any;
}

export class PaymentMethod {
  name?: string;
  payment_processors?: PaymentProcessor[];
}

export class PaymentProcessor {
  name?: string;
}

export class PresignedAcceptance {
  @IsNotEmpty()
  @IsString()
  acceptance_token: string;

  @IsNotEmpty()
  @IsString()
  permalink: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}

export class PresignedPersonalDataAuth {
  @IsNotEmpty()
  @IsString()
  acceptance_token: string;

  @IsNotEmpty()
  @IsString()
  permalink: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}

export class Meta {}
