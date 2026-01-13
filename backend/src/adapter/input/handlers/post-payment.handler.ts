import { CompleteOrderUseCase } from "domain/order/application/complete-order.use-case";
import { PaymentRequestDto } from "../dtos/request/payment.request.dto";
import { PaymentCardModel } from "domain/order/model/payment-card.model";

export class PostPaymentHandler {
    constructor(
        private readonly completeOrderUseCase: CompleteOrderUseCase,
    ) {}

    async execute(paymentRequestDto: PaymentRequestDto) {
        const card = new PaymentCardModel(paymentRequestDto.card.number, paymentRequestDto.card.cvc, paymentRequestDto.card.exp_month, paymentRequestDto.card.exp_year, paymentRequestDto.card.card_holder);
        return await this.completeOrderUseCase.execute(card, paymentRequestDto.orderId, paymentRequestDto.shippingInformation);
    }   
}