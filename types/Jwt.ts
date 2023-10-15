export interface IGeneratedJwtTokens {
  accessToken: string;
  refreshToken: string;
}

export interface ISignJwt {
  name: string;
  email: string;
  _id: string;
  createdAt: Date;
}
