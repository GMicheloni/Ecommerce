/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtservice: JwtService,
  ) {}

  async signIn(email: string, password) {
    const findUser = await this.userRepository.findOneBy({ email: email });
    if (!findUser) throw new BadRequestException('Bad credentials');
    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) throw new BadRequestException('Bad credentials');
    const payload = {
      id: findUser.id,
      email: findUser.email,
      isAdmin: findUser.isAdmin,
    };
    const token = this.jwtservice.sign(payload);
    return token;
  }

  async signUp(user: CreateUserDto) {
    const { confirmpassword, ...userwithoupassword } = user;
    const findUser = await this.userRepository.findOneBy({ email: user.email });
    if (findUser) throw new BadRequestException('User already exists');
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userRepository.save({
      ...userwithoupassword,
      password: hashedPassword,
    });
    const { password, isAdmin, id, ...cleanUser } = newUser;
    return cleanUser;
  }
}
