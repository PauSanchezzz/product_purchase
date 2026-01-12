import { GetPrefirmedTokensUseCase } from "domain/prefirmed-tokens/application/get-prefirmed-tokens.use-case";
import { TypePrefirmedTokensResponseDto } from "../dtos/response/get-prefirmed-tokens.response.dto";
import { PrefirmedTokensMapper } from "../mappers/prefirmed-tokens.mapper";

export class GetPrefirmedTokensHandler {
    constructor(private readonly getPrefirmedTokensUseCase: GetPrefirmedTokensUseCase) {}
    
    async execute(): Promise<TypePrefirmedTokensResponseDto> {
        const tokens = await this.getPrefirmedTokensUseCase.execute()
        return PrefirmedTokensMapper.toResponse(tokens)
    }
}
    