import { ShippingInformationModel } from "domain/shipping/model/shipping.model";

export class CardRequestDto {
    number: string;
    cvc: string;
    exp_month: string;
    exp_year: string;
    card_holder: string;
}

export class PaymentRequestDto {
    card: CardRequestDto;
    orderId: string;
    shippingInformation: Omit<ShippingInformationModel, 'id'>;
}