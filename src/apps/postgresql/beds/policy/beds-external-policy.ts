import {
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RequiredRuleType } from 'src/guards/policy/policy.type';
import { CaslActionsEnum } from 'src/resources/enum/casl-action-enum';
import { Bed } from '../entities/bed.entity';

export type BedsSubjects = InferSubjects<typeof Bed>;
export type BedAbilityType = PureAbility<[CaslActionsEnum, BedsSubjects]>;

export function BedsExternalPolicyFactory(
  context: ExecutionContext,
  reflector: Reflector,
  logger: Logger,
) {
  const { can, cannot, build } = new AbilityBuilder(
    PureAbility as AbilityClass<BedAbilityType>,
  );

  const req: Request = context.switchToHttp().getRequest();
  const user = req.user;

  if (user?.isAdmin) {
    can(CaslActionsEnum.MANAGE, Bed);
  } else {
    cannot(CaslActionsEnum.READ, Bed);
  }

  return build();
}

export const ReadBedsRule: RequiredRuleType<CaslActionsEnum, BedsSubjects> = {
  action: CaslActionsEnum.READ,
  subject: Bed,
};
export const WriteBedsRule: RequiredRuleType<CaslActionsEnum, BedsSubjects> = {
  action: CaslActionsEnum.READ,
  subject: Bed,
};
