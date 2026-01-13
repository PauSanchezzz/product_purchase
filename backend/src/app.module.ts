import { Module } from '@nestjs/common';
import { PrefirmedTokensModule } from './modules/prefirmed-tokens.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/appDataSource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products.module';
import { OrderModule } from './modules/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    PrefirmedTokensModule,
    ProductsModule,
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
