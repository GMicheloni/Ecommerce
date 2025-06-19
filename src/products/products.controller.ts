import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { Products } from './entities/product.entity';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { updateProductDto } from './dtos/updateProduct.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<Products[]> {
    if (page && limit) {
      return this.productService.getAll(+page, +limit);
    }
    return this.productService.getAll(1, 5);
  }
  @Get('seeder')
  seeder() {
    return this.productService.createIntoDataBase();
  }
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() update: updateProductDto,
  ) {
    return this.productService.updateProduct(id, update);
  }
}
