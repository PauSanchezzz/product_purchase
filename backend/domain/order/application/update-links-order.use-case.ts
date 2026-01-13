import { UpdateLinksDto } from "src/adapter/input/dtos/request/update-links.dto";
import { IOrderRepository } from "../repository/order.repository";

export class UpdateLinksOrderUseCase {
    constructor(
        private readonly orderRepository: IOrderRepository
    ) {}


    async execute(orderId: string, personalDataAuthToken: string, endUserPolicyToken: string) {
        try {
            const response = await this.orderRepository.updateLinksOrder(orderId, personalDataAuthToken, endUserPolicyToken);
            if(response){
                return {
                    message: 'Links updated successfully',
                    status: 200,
                    data: response
                };
            }
        } catch (error) {
            throw error
        }
    }
}