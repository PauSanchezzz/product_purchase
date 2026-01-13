export class PaymentCardModel {
    constructor(
        public number: string,
        public cvv: string,
        public expirationMonth: string,
        public expirationYear: string,
        public holderName: string,
    ) {}
}