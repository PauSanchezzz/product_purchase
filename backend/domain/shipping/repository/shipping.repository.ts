import { ShippingInformationModel } from "../model/shipping.model";

export abstract class IShippingRepository {
 abstract createShipping(shipping: Omit<ShippingInformationModel, 'id'>): Promise<ShippingInformationModel>
}