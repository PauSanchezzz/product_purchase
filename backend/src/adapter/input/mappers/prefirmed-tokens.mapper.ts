import { PrefirmedTokenModel } from "domain/prefirmed-tokens/model/prefirmed-tokens.model"
import { TypePrefirmedTokensResponseDto } from "../dtos/response/get-prefirmed-tokens.response.dto"

export abstract class PrefirmedTokensMapper {
    static toResponse(data: PrefirmedTokenModel[]): TypePrefirmedTokensResponseDto {
        const personalDataAuth = data.find(token => token.type === 'PERSONAL_DATA_AUTH')
        const endUserPolicy = data.find(token => token.type === 'END_USER_POLICY')
        return {
            personalDataAuth: personalDataAuth!,
            endUserPolicy: endUserPolicy!
        }        
    }
}