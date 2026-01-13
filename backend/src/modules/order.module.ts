import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/adapter/output/postgres/entities/order.entity';
import { ShippingEntity } from 'src/adapter/output/postgres/entities/shipping.entity';
import { OrderPostgresRepository } from 'src/adapter/output/postgres/repository/order.postgres.repository';
import { CreateOrderUseCase } from 'domain/order/application/create-order.use-case';
import { CreateOrderHandler } from 'src/adapter/input/handlers/create-order.handler';
import { OrderController } from 'src/adapter/input/controllers/order.controller';
import { ProductsModule } from './products.module';
import { ProductsPostgresRepository } from 'src/adapter/output/postgres/repository/products.postgres.repository';
import { GetPrefirmedTokensUseCase } from 'domain/prefirmed-tokens/application/get-prefirmed-tokens.use-case';
import { PrefirmedTokensModule } from './prefirmed-tokens.module';
import { UpdateLinksOrderUseCase } from 'domain/order/application/update-links-order.use-case';
import { UpdateLinksHandler } from 'src/adapter/input/handlers/update-links.handler';
import { GetOrderUseCase } from 'domain/order/application/get-order.use-case';
import { GetOrderHandler } from 'src/adapter/input/handlers/get-order.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, ShippingEntity]),
    ProductsModule,
    PrefirmedTokensModule
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: OrderPostgresRepository,
      useClass: OrderPostgresRepository,
    },
    {
      provide: CreateOrderUseCase,
      useFactory: (
        orderRepository: OrderPostgresRepository,
        productRepository: ProductsPostgresRepository,
      ) => {
        return new CreateOrderUseCase(orderRepository, productRepository);
      },
      inject: [OrderPostgresRepository, ProductsPostgresRepository],
    },
    {
      provide: CreateOrderHandler,
      useFactory: (createOrderUseCase: CreateOrderUseCase, getPrefirmedTokensUseCase: GetPrefirmedTokensUseCase) => {
        return new CreateOrderHandler(createOrderUseCase, getPrefirmedTokensUseCase);
      },
      inject: [CreateOrderUseCase, GetPrefirmedTokensUseCase],
    },
    {
      provide: UpdateLinksOrderUseCase,
      useFactory: (orderRepository: OrderPostgresRepository) => {
        return new UpdateLinksOrderUseCase(orderRepository);
      },
      inject: [OrderPostgresRepository],
    },
    {
      provide: UpdateLinksHandler,
      useFactory: (updateLinksOrderUseCase: UpdateLinksOrderUseCase) => {
        return new UpdateLinksHandler(updateLinksOrderUseCase);
      },
      inject: [UpdateLinksOrderUseCase],
    },
    {
      provide: GetOrderUseCase,
      useFactory: (orderRepository: OrderPostgresRepository) => {
        return new GetOrderUseCase(orderRepository);
      },
      inject: [OrderPostgresRepository],
    },
    {
      provide: GetOrderHandler,
      useFactory: (getOrderUseCase: GetOrderUseCase) => {
        return new GetOrderHandler(getOrderUseCase);
      },
      inject: [GetOrderUseCase],
    },
  ],
})
export class OrderModule {}
