import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/roles.enum';
import { Roles } from 'src/decorators/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { updateUserDto } from './dtos/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAllUsers(@Query('page') page?: number, @Query('limit') limit?: number) {
    if (page && limit) {
      return this.usersService.getAllUsers(+page, +limit);
    }
    return this.usersService.getAllUsers(1, 5);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUser(id);
  }
  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() update: updateUserDto,
  ) {
    return this.usersService.update(id, update);
  }
  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
