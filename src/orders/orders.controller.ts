import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dtos/order.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() order: OrderDto) {
    const { userId, products } = order;
    return this.ordersService.create(userId, products);
  }
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }
}
