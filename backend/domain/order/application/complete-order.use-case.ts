import { ShippingInformationModel } from 'domain/shipping/model/shipping.model';
import { PaymentCardModel } from '../model/payment-card.model';
import { IOrderRepository } from '../repository/order.repository';
import { OrderStatus } from '../model/order-status.enum';
import { IProductsRepository } from 'domain/products/repository/products.repository';
import { IShippingRepository } from 'domain/shipping/repository/shipping.repository';
import { IPaymentRepository } from '../repository/payment.repository';

export class CompleteOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly productsRepository: IProductsRepository,
    private readonly shippingRepository: IShippingRepository,
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute(
    card: PaymentCardModel,
    orderId: string,
    shippingInformation: Omit<ShippingInformationModel, 'id'>,
  ) {
    try {
      const order = await this.orderRepository.getOrder(orderId);
      if (!order) {
        throw new Error('Order not found');
      }

      if (order.status !== OrderStatus.PENDING) {
        throw new Error('Order is not in pending state');
      }

      const product = await this.productsRepository.getProductById(
        order.productId,
      );
      if (!product) {
        throw new Error('Product not found');
      }

      if (order.quantity <= 0 && order.quantity > product.stock) {
        throw new Error('Order quantity is not valid');
      }

      const shipping =
        await this.shippingRepository.createShipping(shippingInformation);

      order.shippingInformation = shipping;

      const paymentResult = await this.paymentRepository.payment(card, order);

      order.status = paymentResult.status;

      await this.orderRepository.updateOrder(order);

      if (paymentResult.status === OrderStatus.REJECTED) {
        throw new Error('Payment was rejected');
      }

      if(order.status === OrderStatus.COMPLETED){
        await this.productsRepository.updateProductStock(
          order.productId,
          product.stock - order.quantity,
        );
      }

      return order;
    } catch (error) {
      throw error;
    }
  }
}
