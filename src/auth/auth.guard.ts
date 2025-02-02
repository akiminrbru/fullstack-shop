import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { CookieService } from './cokkie.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const token = request.cookies[CookieService.tokenKey];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const sessionInfo = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['session'] = sessionInfo;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
