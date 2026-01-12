import { Module } from '@nestjs/common';
import { GetProductsUseCase } from 'domain/products/application/get-products.use-case';
import { ProductsController } from 'src/adapter/input/controllers/products.controller';
import { GetProductsHandler } from 'src/adapter/input/handlers/get-products.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/adapter/output/postgres/entities/product.entity';
import { ProductsPostgresRepository } from 'src/adapter/output/postgres/repository/products.postgres.repository';
import { GetProductUseCase } from 'domain/products/application/get-product.use-case';
import { GetProductHandler } from 'src/adapter/input/handlers/get-product.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductsController],
  providers: [
    {
        provide: ProductsPostgresRepository,
        useClass: ProductsPostgresRepository,
    },
    {
        provide: GetProductsUseCase,
        useFactory: (ProductsPostgresRepository: ProductsPostgresRepository) => {
            return new GetProductsUseCase(ProductsPostgresRepository)
        },
        inject: [ProductsPostgresRepository],
    },
    {
        provide: GetProductUseCase,
        useFactory: (ProductsPostgresRepository: ProductsPostgresRepository) => {
            return new GetProductUseCase(ProductsPostgresRepository)
        },
        inject: [ProductsPostgresRepository],
    },
    {
        provide: GetProductHandler,
        useFactory: (GetProductUseCase: GetProductUseCase) => {
            return new GetProductHandler(GetProductUseCase)
        },
        inject: [GetProductUseCase],
    },
    {
        provide: GetProductsHandler,
        useFactory: (GetProductsUseCase: GetProductsUseCase) => {
            return new GetProductsHandler(GetProductsUseCase)
        },
        inject: [GetProductsUseCase],
    }
  ],
  exports: [GetProductsHandler],
})
export class ProductsModule { }
