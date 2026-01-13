import { IPaymentRepository } from 'domain/order/repository/payment.repository';
import { PaymentCardModel } from 'domain/order/model/payment-card.model';
import { OrderModel } from 'domain/order/model/order.model';
import { PaymentResultModel } from 'domain/order/model/payment-result.model';
import { envOptions } from 'src/config/env.options';
import * as crypto from 'crypto';
import { WompiTransactionStatus } from '../dtos/response/wompi-transaction-status.enum';
import { OrderStatus } from 'domain/order/model/order-status.enum';
import { PostCreateTransactionRequestDto } from '../dtos/request/post-create-transaction.request.dto';
import { WompiStatusMyStatusMapper } from '../mappers/wompi-status-my-status.mapper';
import { GetWompiTransactionResponseDto } from '../dtos/response/get-wompi-transaction-response.dto';
import { PostCreateTransactionResponseDto } from '../dtos/response/post-create-transaction-response.dto';
import { PostCardTokenizedRequestDto } from '../dtos/response/post-card-tokenized-request.dto';
import { PostCardTokenizedResponseDto } from '../dtos/response/post-card-tokenized-response.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentWompiRepository implements IPaymentRepository {
  private readonly projectKey = 'pau_sanchez_wompi';
  async payment(
    card: PaymentCardModel,
    order: OrderModel,
  ): Promise<PaymentResultModel> {
    const tokenizedCard = await this.tokenizeCard({

      number: card.number,
      cvc: card.cvv,
      exp_month: card.expirationMonth,
      exp_year: card.expirationYear,
      card_holder: card.holderName,
    });
    console.log('tokenizedCard', tokenizedCard);
    const amountInCents = order.total! * 100;
    const signature = `${this.projectKey}-${order.id}${amountInCents}COP${envOptions.WOMPI_INTEGRATION_KEY}`;
    const encryptedSignature = crypto
      .createHash('sha256')
      .update(signature)
      .digest('hex');

    const createTransactionRequest: PostCreateTransactionRequestDto = {
      acceptance_token: order.endUserPolicyToken!,
      amount_in_cents: amountInCents,
      currency: 'COP',
      signature: encryptedSignature,
      customer_email: order.shippingInformation?.customerEmail!,
      payment_method: {
        type: 'CARD',
        token: tokenizedCard.data.id,
        installments: 1,
      },
      reference: `${this.projectKey}-${order.id}`,
      customer_data: {
        full_name: order.shippingInformation?.customer!,
      },
      shipping_address: {
        address_line_1: order.shippingInformation?.address!,
        city: order.shippingInformation?.city!,
        /* country: order.shippingInformation?.country!, */
        country: 'CO',
        phone_number: order.shippingInformation?.phone!,
        postal_code: order.shippingInformation?.postalCode!,
        region: order.shippingInformation?.region!,
      },
    };

    const creationResult = await this.createTransaction(
      createTransactionRequest,
    );
    

    if (creationResult.data.status !== WompiTransactionStatus.PENDING) {
      return {
        id: creationResult.data.id,
        status: creationResult.data.status as OrderStatus,
      };
    }
    // * Retries to get the transaction status with a 1 second delay
    let retries = 5;
    let transactionStatus = WompiTransactionStatus.PENDING;
    while (
      retries > 0 &&
      transactionStatus === WompiTransactionStatus.PENDING
    ) {
      const transactionStatusResponse = await this.getTransaction(
        creationResult.data.id,
      );
      transactionStatus = transactionStatusResponse.data
        .status as WompiTransactionStatus;
      retries--;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return {
      id: creationResult.data.id,
      status: WompiStatusMyStatusMapper.map(transactionStatus),
    };
  }

  private async getTransaction(
    transactionId: string,
  ): Promise<GetWompiTransactionResponseDto> {
    const response = await fetch(
      `${envOptions.WOMPI_API_URL}/transactions/${transactionId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${envOptions.WOMPI_PRIVATE_KEY}`,
        },
      },
    );
    return (await response.json()) as GetWompiTransactionResponseDto;
  }

  private async createTransaction(
    wompiRequest: PostCreateTransactionRequestDto,
  ): Promise<PostCreateTransactionResponseDto> {
    const response = await fetch(`${envOptions.WOMPI_API_URL}/transactions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${envOptions.WOMPI_PRIVATE_KEY}`,
      },
      body: JSON.stringify(wompiRequest),
    });

    return (await response.json()) as PostCreateTransactionResponseDto;
  }
  private async tokenizeCard(
    paymentCard: PostCardTokenizedRequestDto,
  ): Promise<PostCardTokenizedResponseDto> {
    const response = await fetch(`${envOptions.WOMPI_API_URL}/tokens/cards`, {
      method: 'POST',
      body: JSON.stringify(paymentCard),
      headers: {
        Authorization: `Bearer ${envOptions.WOMPI_PUBLIC_KEY}`,
      },
    });
    return (await response.json()) as PostCardTokenizedResponseDto;
  }
}
