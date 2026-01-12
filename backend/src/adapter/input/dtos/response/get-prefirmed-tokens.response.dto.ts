import { PrefirmedTokenModel } from "domain/prefirmed-tokens/model/prefirmed-tokens.model";

export interface TypePrefirmedTokensResponseDto { 
    personalDataAuth: PrefirmedTokenModel, 
    endUserPolicy: PrefirmedTokenModel
}
