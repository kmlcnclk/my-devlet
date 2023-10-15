import { IGeneratedJwtTokens, ISignJwt } from '@/types/Jwt';
import { signJwt, verifyJwt } from '../lib/jwt';
import JwtTokenDAO from '@/server/data/JwtTokenDAO';
import UserService from './UserService';
import mongoose from 'mongoose';
import { get } from 'lodash';
import AdminService from './AdminService';

class JwtService {
  constructor() {}

  async generateJwtToken<T>(user: T): Promise<IGeneratedJwtTokens> {
    const userObject: ISignJwt = {
      name: get(user, 'name') as string,
      email: get(user, 'email') as string,
      _id: get(user, '_id') as string,
      createdAt: get(user, 'createdAt') as Date,
    };

    const accessToken: string = signJwt(
      userObject,
      'ACCESS_TOKEN_PRIVATE_KEY',
      {
        expiresIn: process.env.ACCESS_TOKEN_TTL,
      }
    );

    const refreshToken: string = signJwt(
      userObject,
      'REFRESH_TOKEN_PRIVATE_KEY',
      {
        expiresIn: process.env.REFRESH_TOKEN_TTL,
      }
    );

    return { accessToken, refreshToken };
  }

  async isValidatePassword<
    T,
    S extends typeof UserService | typeof AdminService
  >(
    data: {
      email: string;
      password: string;
    },
    service: S
  ): Promise<T> {
    const resData = await service.validatePasswordWithEmail(data);
    return resData as T;
  }

  async generateWithIdAndSaveDbJwtToken<T>(user: T): Promise<object> {
    const generatedJwtTokens = await this.generateJwtToken<T>(user);

    // saved on db
    const generatedTokens = await JwtTokenDAO.create(
      new mongoose.Types.ObjectId(get(user, '_id') as string),
      get(generatedJwtTokens, 'accessToken'),
      get(generatedJwtTokens, 'refreshToken')
    );

    return generatedTokens;
  }

  isValidRefreshToken = async (refreshToken: string): Promise<object> => {
    const { decoded, expired } = verifyJwt(
      refreshToken,
      'REFRESH_TOKEN_PRIVATE_KEY'
    );

    // valid can't be empty & need to be valid=true
    if (!decoded) return { value: false, message: 'Decode Failed' };

    const userId = get(decoded, '_id');
    if (userId == undefined) return { value: false, message: 'User Not Found' };

    const where = { refreshToken: refreshToken, user: userId, valid: true };
    const jwtToken = await JwtTokenDAO.findOne(where);

    if (jwtToken != undefined || jwtToken)
      return { value: true, message: 'JWT Token Still Valid', user: decoded };

    // TODO: LOG return value need log
    return { value: false, message: 'JWT Token Invalid' };
  };

  async updateJwtValidWithFalseOnDb(userId: string): Promise<void> {
    const where = { user: new mongoose.Types.ObjectId(userId) };
    const update = { valid: false };

    // TODO: log updated data values
    const t = await JwtTokenDAO.updateMany(where, update);
  }
}

export default new JwtService();
