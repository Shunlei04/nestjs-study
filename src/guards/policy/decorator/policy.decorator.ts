import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY';
export const ARE_PUBLIC_KEY = 'ARE_PUBLIC_KEY';

export const IS_ONLY_FOR_ADMIN = 'IS_ONLY_FOR_ADMIN';
export const ARE_ONLY_FOR_ADMIN = 'ARE_ONLY_FOR_ADMIN';

export const CurrentUser = createParamDecorator(
  (key: any, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    return key ? req.user?.[key] : req.user;
  },
);

export const IsPulic = () => SetMetadata<string, boolean>(IS_PUBLIC_KEY, true);

export const ArePulic = () =>
  SetMetadata<string, boolean>(ARE_PUBLIC_KEY, true);

export const IsAdmin = () =>
  SetMetadata<string, boolean>(IS_ONLY_FOR_ADMIN, true);

export const AreAdmin = () =>
  SetMetadata<string, boolean>(ARE_ONLY_FOR_ADMIN, true);
