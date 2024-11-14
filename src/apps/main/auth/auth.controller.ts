import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninPayloadPipe } from './pipes/signin-payload.pipe';
import { SigninPayloadType } from './auth.type';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signin')
  signinUser(
    @Body(SigninPayloadPipe) payload: SigninPayloadType,
    @Req() req: Request,
  ) {
    return this.authService.signinUser(payload, req.ip);
  }
}
