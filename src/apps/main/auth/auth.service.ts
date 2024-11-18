import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SigninPayloadType, TokenPayloadType } from './auth.type';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CryptoJsService } from 'src/services/individual/crypto/crypto.service';
import { AppEnvValues } from 'src/resources/env/app.env';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private cryptoJsService: CryptoJsService,
  ) {
    // console.log(AppEnvValues.JWT_SECRET_KEY);
  }

  async signinUser(req: Request, payload: SigninPayloadType, ip: string) {
    const user = await this.usersService.findOne({
      where: { username: payload.username },
    });

    const isPasswordCorrect = await compare(payload.password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const userAgentHex = this.cryptoJsService.hexString(
      req.headers['user-agent'],
    );

    // generate acccess token
    const accessTokenPayload: TokenPayloadType = {
      tp: 0,
      uid: user.id,
      ip: req.ip,
      usa: userAgentHex,
    };
    const accessToken = sign(accessTokenPayload, AppEnvValues.JWT_SECRET_KEY, {
      expiresIn: AppEnvValues.ACCESS_TOKEN_EXP_SECOND,
    });

    // generate acccess token
    const refreshTokenPayload: TokenPayloadType = {
      tp: 1,
      uid: user.id,
      ip: ip,
      usa: userAgentHex,
    };
    const refreshToken = sign(
      refreshTokenPayload,
      AppEnvValues.JWT_SECRET_KEY,
      {
        expiresIn: AppEnvValues.ACCESS_TOKEN_EXP_SECOND,
      },
    );

    return { accessToken, refreshToken };
  }
}
