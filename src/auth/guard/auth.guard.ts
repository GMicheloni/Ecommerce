/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtservice: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Falta el encabezado Authorization');
    }

    const token = authHeader.split(' ')[1];

    if (!token) throw new UnauthorizedException('Falta el token');

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtservice.verify(token, { secret });

      if (user.isAdmin) {
        user.roles = [Role.Admin];
      } else {
        user.roles = [Role.User];
      }
      request.user = user;

      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.iat * 1000);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    return true;
  }
}
