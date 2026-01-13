import { PrefirmedTokenModel } from "../model/prefirmed-tokens.model";

export abstract class IPrefirmedTokensRepository {
    abstract getPrefirmedToken(): Promise<PrefirmedTokenModel[]>;
}