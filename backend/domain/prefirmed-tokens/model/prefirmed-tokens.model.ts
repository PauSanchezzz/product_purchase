
export class PrefirmedTokenModel {
  constructor(
    public readonly permalink: string,
    public readonly type: 'PERSONAL_DATA_AUTH' | 'END_USER_POLICY',
    public readonly acceptance_token: string,
  ) { }
}
