import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async getAllUsers(page: number, limit: number) {
    let users = await this.userRepository.find();

    const start = (page - 1) * limit;
    const end = start + limit;

    users = users.slice(start, end);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...user }) => user);
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, isAdmin, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
  async update(id: string, update) {
    await this.userRepository.update(id, update);
    return 'Usuario Actualizado';
  }
  async delete(id: string) {
    await this.userRepository.delete(id);
    return 'Usuario Eliminado';
  }
}
