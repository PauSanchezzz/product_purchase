import { Controller, Get } from "@nestjs/common";
import { TypePrefirmedTokensResponseDto } from "../dtos/response/get-prefirmed-tokens.response.dto";
import { GetPrefirmedTokensHandler } from "../handlers/get-prefirmed-tokens.handler";

@Controller('prefirmed-tokens')
export class PrefirmedTokensController {
    constructor(private readonly getPrefirmedTokensHandler: GetPrefirmedTokensHandler) {}

    @Get()
    async GetPrefirmedTokens(): Promise<TypePrefirmedTokensResponseDto> {
        try {
            return this.getPrefirmedTokensHandler.execute()
        } catch (error) {
            throw error
        }
    }
}
