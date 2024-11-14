import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/apps/main/users/users.service';
import { TokenService } from 'src/services/global/token/token.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    // skip auth route
    if (req.url.startsWith('/auth')) {
      return true;
    }

    // extract token
    const bearToken = req.headers.authorization;
    const token = bearToken.replace('Bearer ', '');

    // verify token
    const tokenPayload = this.tokenService.verifyAccessToken(token);
    console.log(tokenPayload);

    // ip
    if (tokenPayload.ip !== req.ip) {
      throw new UnauthorizedException('IP is incorrect');
    }

    // user
    const user = await this.usersService.findOne({
      where: { id: tokenPayload.uid },
    });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    // assign user to request
    req.user = user;

    return true;
  }
}
