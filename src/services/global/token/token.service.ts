import { Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { TokenPayloadType } from 'src/apps/main/auth/auth.type';
import { AppEnvValues } from 'src/resources/env/app.env';

@Injectable()
export class TokenService {
  verifyAccessToken(token: string) {
    const tokenPayload: TokenPayloadType = verify(
      token,
      AppEnvValues.JWT_SECRET_KEY,
    ) as any;

    return tokenPayload;
  }
}
