import { Module } from '@nestjs/common';
import { PrefirmedTokensModule } from './modules/prefirmed-tokens.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/appDataSource';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    /* TypeOrmModule.forRoot(typeOrmConfig), */
    PrefirmedTokensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
