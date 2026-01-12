import { IPrefirmedTokensRepository } from "domain/prefirmed-tokens/repository/prefirmed-tokens.respository";
import { envOptions } from "src/config/env.options";
import { GetPrefirmedTokensResponseDto } from "../dtos/response/prefirmed-tokens.response.dto";
import { PrefirmedTokensMappers } from "../mappers/prefirmed-tokens.mapper";
import { PrefirmedTokenModel } from "domain/prefirmed-tokens/model/prefirmed-tokens.model";

export class PrefirmedTokensWompiRepository implements IPrefirmedTokensRepository {
    async getPrefirmedToken(): Promise<PrefirmedTokenModel[]> {
        try {
            const response = await fetch(`${envOptions.WOMPI_API_URL}/merchants/${envOptions.WOMPI_PUBLIC_KEY}`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = (await response.json()) as GetPrefirmedTokensResponseDto
            return PrefirmedTokensMappers.toDomain(data)
        } catch (error) {
            throw error
        }   
    }
}