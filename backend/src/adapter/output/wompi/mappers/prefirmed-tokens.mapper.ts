import { PrefirmedTokenModel } from "domain/prefirmed-tokens/model/prefirmed-tokens.model";
import { GetPrefirmedTokensResponseDto } from "../dtos/response/prefirmed-tokens.response.dto";

export abstract class PrefirmedTokensMappers {
    static toDomain(data: GetPrefirmedTokensResponseDto): PrefirmedTokenModel[] {
        const acceptanceToken = data.data.presigned_acceptance
        const personalDataAuth = data.data.presigned_personal_data_auth
          return [
            new PrefirmedTokenModel(
                 acceptanceToken.permalink,
                 'END_USER_POLICY',
                 acceptanceToken.acceptance_token,
          ),
           new PrefirmedTokenModel(
               personalDataAuth.permalink,
               'PERSONAL_DATA_AUTH',
               personalDataAuth.acceptance_token,
            )
          ]
    }
    
}