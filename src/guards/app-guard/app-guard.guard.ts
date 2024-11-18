import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AssignReqGuard } from '../assign-req/assign-req.guard';
import { PolicyGuard } from '../policy/policy.guard';

@Injectable()
export class AppGuardGuard implements CanActivate {
  constructor(
    private assignReqGuard: AssignReqGuard,
    private policyGuard: PolicyGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const reqAssigned = await this.assignReqGuard.canActivate(context);
    const isPolicyPassed = await this.policyGuard.canActivate(context);

    return reqAssigned && isPolicyPassed;
  }
}
