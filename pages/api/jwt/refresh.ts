import { NextApiResponse, NextApiRequest } from 'next';
import { get } from 'lodash';
import JwtService from '@/server/services/JwtService';
import { ISignJwt } from '@/types/Jwt';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const refreshToken = get(req, 'headers.x-refresh');
      if (refreshToken != undefined || refreshToken) {
        const refreshTokenResponse = await JwtService.isValidRefreshToken(
          refreshToken as string
        );

        if (get(refreshTokenResponse, 'value') == true) {
          //TODO: old token valid to invalid & new token generate - return

          const user = get(refreshTokenResponse, 'user') as unknown as ISignJwt;
          await JwtService.updateJwtValidWithFalseOnDb(user._id);

          const generatedTokensData =
            await JwtService.generateWithIdAndSaveDbJwtToken<ISignJwt>(user);

          return res.status(201).json(generatedTokensData);
        } else {
          return res.status(403).json({
            data: get(refreshTokenResponse, 'value'),
            message: get(refreshTokenResponse, 'message'),
          });
        }
      } else {
        return res
          .status(404)
          .json({ message: 'JWT Refresh Token Do Not Exist' });
      }
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.status(403).json({ message: 'You have not a permission' });
  }
}

export default handler;
