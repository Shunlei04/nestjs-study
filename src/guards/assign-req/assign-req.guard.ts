import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/apps/main/users/users.service';
import { TokenService } from 'src/services/global/token/token.service';
import {
  ARE_ONLY_FOR_ADMIN,
  ARE_PUBLIC_KEY,
  IS_ONLY_FOR_ADMIN,
  IS_PUBLIC_KEY,
} from '../policy/decorator/policy.decorator';
import { Request } from 'express';

@Injectable()
export class AssignReqGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    try {
      // is admmin
      const isAdmin =
        this.reflector.get(IS_ONLY_FOR_ADMIN, context.getHandler()) ?? false;

      // are public
      const areAdmin =
        this.reflector.getAllAndOverride(ARE_ONLY_FOR_ADMIN, [
          context.getClass(),
          context.getHandler(),
        ]) ?? false;

      req.isRouterOnlyForAdmin = isAdmin || areAdmin;
    } catch (error) {
      console.log(error);
    }

    // assign policy decorator
    try {
      // is public
      const isPublic =
        this.reflector.get(IS_PUBLIC_KEY, context.getHandler()) ?? false;

      // are public
      const arePublic =
        this.reflector.getAllAndOverride(ARE_PUBLIC_KEY, [
          context.getClass(),
          context.getHandler(),
        ]) ?? false;

      req.isRouterPublic = isPublic || arePublic;
    } catch (error) {
      console.log(error);
    }

    // assign token user
    try {
      // extract token
      const bearToken = req.headers.authorization;
      const token = bearToken.replace('Bearer ', '');

      // verify token
      const tokenPayload = this.tokenService.verifyAccessToken(token);

      // find and verify user
      const user = await this.usersService.findOne({
        where: { id: tokenPayload?.uid },
      });

      // assign user to request
      req.user = user;
    } catch (error) {
      console.log(error);
    }

    return true;
  }
}
