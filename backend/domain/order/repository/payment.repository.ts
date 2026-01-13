import { PaymentCardModel } from "../model/payment-card.model";
import { OrderModel } from "../model/order.model";
import { PaymentResultModel } from "../model/payment-result.model";

export abstract class IPaymentRepository {
    abstract payment(card: PaymentCardModel, order: OrderModel): Promise<PaymentResultModel>
}