import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CryptoJsService } from 'src/services/individual/crypto/crypto.service';
import {
  EXTERNAL_POLICY_FACTORY,
  REQUIRED_RULE,
} from './decorator/policy.decorator';
import { PolicyFactoryType, RequiredRuleType } from './policy.type';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private cryptoJsService: CryptoJsService,
    private reflector: Reflector,
    private logger: Logger,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    // is user public
    if (req.isRouterPublic) {
      return true;
    }

    // is user valid
    if (!req.user?.active) {
      throw new UnauthorizedException('User account is inactive');
    }

    // is lock
    if (req.user?.isLocked) {
      throw new UnauthorizedException('User account is locked');
    }

    // is ip matched
    if (req.ip !== req.tokenPayload.ip) {
      throw new UnauthorizedException(`IP not matched`);
    }

    // user agent
    if (
      this.cryptoJsService.hexString(req.headers['user-agent']) !==
      req.tokenPayload.usa
    ) {
      throw new UnauthorizedException(`User agent not matched`);
    }

    // is router only for admin
    if (req.isRouterOnlyForAdmin) {
      if (req.user?.isAdmin) {
        return true;
      } else {
        throw new UnauthorizedException(
          'User is not admin, router is only for admin',
        );
      }
    }

    // check user
    if (!req.user) {
      throw new UnauthorizedException('User does not exist');
    }

    // rules
    // get policy factory
    const policyFactory = this.reflector.getAllAndOverride(
      EXTERNAL_POLICY_FACTORY,
      [context.getClass(), context.getHandler()],
    ) as PolicyFactoryType;

    if (policyFactory) {
      const ability = policyFactory(context, this.reflector, this.logger);
      const rules = this.reflector.get(
        REQUIRED_RULE,
        context.getHandler(),
      ) as RequiredRuleType<any, any, any>[];

      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(rule);

        // example
        // if (!ability.can(rule.action, rule.subject, rule.fields)) {
        //   throw new UnauthorizedException('You are not allowed');
        // }
      });
    }

    return true;
  }
}