import { PrefirmedTokenModel } from "../model/prefirmed-tokens.model"
import { IPrefirmedTokensRepository } from "../repository/prefirmed-tokens.respository"

export class GetPrefirmedTokensUseCase {
    constructor (private readonly repository: IPrefirmedTokensRepository) {}
    
    async execute(): Promise<PrefirmedTokenModel[]> {
        try {
            const prefirmedTokens = await this.repository.getPrefirmedToken()
            return prefirmedTokens
        } catch (error) {
            throw error
        }
    }
}