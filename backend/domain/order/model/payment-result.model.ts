import { OrderStatus } from "./order-status.enum";

export interface PaymentResultModel {
 id: string;
 status: OrderStatus;
}