import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Observable } from 'rxjs';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private jwtService?: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const token = req.headers['authorization'].split(' ')[1];

      if (!token) throw new UnauthorizedException();

      const data = await this.jwtService.verifyAsync(token, {
        secret: process.env.TOKEN_SECRET,
      });

      req.user = data;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }

    return true;
  }
}
