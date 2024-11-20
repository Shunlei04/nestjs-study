import { AbilityBuilder, AbilityClass, PureAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/apps/main/users/entities/user.entity';
import { BedAbilityType } from './beds-external-policy';
import { CaslActionsEnum } from 'src/resources/enum/casl-action-enum';
import { Bed } from '../entities/bed.entity';
import { CreateBedDto } from '../dto/create-bed.dto';

@Injectable()
export class BedsInternalPolicy {
  constructor() {}

  definePolicy(user: User, obj: CreateBedDto) {
    const ability = new AbilityBuilder(
      PureAbility as AbilityClass<BedAbilityType>,
    );

    if (user?.isAdmin) {
      ability.can(CaslActionsEnum.MANAGE, Bed);
    } else {
      if (obj.bedNo?.startsWith('2')) {
        ability.can(CaslActionsEnum.WRITE, Bed);
      } else {
        ability
          .cannot(CaslActionsEnum.WRITE, Bed)
          .because(
            'You are not admin, and you can only create bedNo startwith 2',
          );
      }
    }
    return ability.build();
  }
}
