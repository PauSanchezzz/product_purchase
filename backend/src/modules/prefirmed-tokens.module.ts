import { Module } from '@nestjs/common';
import {  GetPrefirmedTokensUseCase } from 'domain/prefirmed-tokens/application/get-prefirmed-tokens.use-case';
import { PrefirmedTokensController } from 'src/adapter/input/controllers/prefirmed-tokens.controller';
import { GetPrefirmedTokensHandler } from 'src/adapter/input/handlers/get-prefirmed-tokens.handler';
import { PrefirmedTokensWompiRepository } from 'src/adapter/output/wompi/repository/prefirmed-tokens.wompi.respository';


@Module({
  imports: [],
  controllers: [PrefirmedTokensController],
  providers: [
    {
      provide: PrefirmedTokensWompiRepository,
      useClass: PrefirmedTokensWompiRepository,
    },
    {
        provide: GetPrefirmedTokensUseCase,
        useFactory: (PrefirmedTokensWompiRepository: PrefirmedTokensWompiRepository) => {
            return new GetPrefirmedTokensUseCase(PrefirmedTokensWompiRepository)
        },
        inject: [PrefirmedTokensWompiRepository],
    },
    {
        provide: GetPrefirmedTokensHandler,
        useFactory: (GetPrefirmedTokensUseCase: GetPrefirmedTokensUseCase) => {
            return new GetPrefirmedTokensHandler(GetPrefirmedTokensUseCase)
        },
        inject: [GetPrefirmedTokensUseCase],
    }
  ],
  exports: [GetPrefirmedTokensHandler],
})
export class PrefirmedTokensModule { }
