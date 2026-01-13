import { ShippingInformationModel } from "domain/shipping/model/shipping.model";

export class CreateOrderDto {
    productId: number;
    quantity: number;
    shippingInformation?: ShippingInformationModel;
}
