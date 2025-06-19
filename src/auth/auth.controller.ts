import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from 'src/users/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
  @Post('/signin')
  signIn(@Body() body: LoginDto) {
    const { email, password } = body;
    return this.authService.signIn(email, password);
  }
}
