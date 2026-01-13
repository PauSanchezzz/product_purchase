import { OrderStatus } from "domain/order/model/order-status.enum";
import { WompiTransactionStatus } from "../dtos/response/wompi-transaction-status.enum";

export class WompiStatusMyStatusMapper {
  static map(wompiStatus: WompiTransactionStatus): OrderStatus {
    switch (wompiStatus) {
      case WompiTransactionStatus.PENDING:
        return OrderStatus.PENDING;
      case WompiTransactionStatus.APPROVED:
        return OrderStatus.COMPLETED;
        case WompiTransactionStatus.CREATED:
        return OrderStatus.COMPLETED;
      case WompiTransactionStatus.DECLINED:
        return OrderStatus.REJECTED;
      case WompiTransactionStatus.ERROR:
        return OrderStatus.REJECTED;
      case WompiTransactionStatus.VOIDED:
        return OrderStatus.REJECTED;

    }
  }
}