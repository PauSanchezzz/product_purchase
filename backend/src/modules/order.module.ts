import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/adapter/output/postgres/entities/order.entity';
import { OrderPostgresRepository } from 'src/adapter/output/postgres/repository/order.postgres.repository';
import { CreateOrderUseCase } from 'domain/order/application/create-order.use-case';
import { CreateOrderHandler } from 'src/adapter/input/handlers/create-order.handler';
import { OrderController } from 'src/adapter/input/controllers/order.controller';
import { ProductsModule } from './products.module';
import { ProductsPostgresRepository } from 'src/adapter/output/postgres/repository/products.postgres.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    ProductsModule,
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
      useFactory: (createOrderUseCase: CreateOrderUseCase) => {
        return new CreateOrderHandler(createOrderUseCase);
      },
      inject: [CreateOrderUseCase],
    },
  ],
})
export class OrderModule {}
