import { UpdateLinksOrderUseCase } from "domain/order/application/update-links-order.use-case";
import { UpdateLinksDto } from "../dtos/request/update-links.dto";

export class UpdateLinksHandler {
    constructor(
        private readonly updateLinksOrderUseCase: UpdateLinksOrderUseCase
    ) {}

    async execute(orderId: string, updateLinksDto: UpdateLinksDto) {
        return this.updateLinksOrderUseCase.execute(orderId, updateLinksDto.personalDataAuth.acceptance_token, updateLinksDto.endUserPolicy.acceptance_token);
    }
}
