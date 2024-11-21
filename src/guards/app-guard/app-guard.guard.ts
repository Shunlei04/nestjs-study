import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AssignReqGuard } from '../assign-req/assign-req.guard';
import { PolicyGuard } from '../policy/policy.guard';

@Injectable()
export class AppGuardGuard implements CanActivate {
  private staticRoute: string[] = ['/app', '/assets'];

  constructor(
    private assignReqGuard: AssignReqGuard,
    private policyGuard: PolicyGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (this.staticRoute.some((s) => req.path.startsWith(s))) {
      return true;
    }

    const reqAssigned = await this.assignReqGuard.canActivate(context);
    const isPolicyPassed = await this.policyGuard.canActivate(context);

    return reqAssigned && isPolicyPassed;
  }
}
