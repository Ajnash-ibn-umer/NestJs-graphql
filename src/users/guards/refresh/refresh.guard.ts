import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest()

      const token = req.headers["authorization"].split(" ")[1]
   

      if (!token) throw new UnauthorizedException()

      const data = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_SECRET
      })


      req.user = data
    } catch (error) {
     

      throw new UnauthorizedException(error.message)
    }

    return true;


  }
}

