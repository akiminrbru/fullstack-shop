import {
  Body,
  Controller,
  createParamDecorator,
  Delete,
  ExecutionContext,
  Get,
  Patch,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartDto } from './dto/addCart.dto';
import { DeleteCartDto } from './dto/deleteCart.dto';
import { UpdateCartDto } from './dto/updateCart.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

export const AuthHeader = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  },
);

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Получение корзины' })
  @Get()
  getCart(@AuthHeader() authHeader: string) {
    return this.cartService.getCart(authHeader);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Добавлание товара в коризну' })
  @Post()
  addCart(@Body() addCartDto: AddCartDto, @AuthHeader() authHeader: string) {
    return this.cartService.addCart(addCartDto.id, authHeader);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Удаление товара из коризну' })
  @Delete()
  deleteCart(
    @Body() deleteCartDto: DeleteCartDto,
    @AuthHeader() authHeader: string,
  ) {
    return this.cartService.deleteCart(deleteCartDto.id, authHeader);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Изменение количества товара в коризне' })
  @Patch()
  updateCart(@Body() dto: UpdateCartDto, @AuthHeader() authHeader: string) {
    return this.cartService.updateCart(dto.id, dto.quantity, authHeader);
  }
}
