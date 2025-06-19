import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/roles.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('seeder')
  seeder() {
    return this.categoriesService.createIntoDataBase();
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  update(@Body() categories: string) {
    return this.categoriesService.update(categories);
  }
}
