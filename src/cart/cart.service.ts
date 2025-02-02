import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  async getCart(token: string) {
    if (!token) {
      return { message: 'Авторизуйтесь, чтобы видеть корзину' };
    }
    const userId: number = await this.authService.getUserId(token);

    const userCart = await this.prismaService.cart.findFirst({
      where: {
        userId: userId,
      },
      include: {
        items: {
          include: {
            productItem: {
              include: {
                category: true,
                brand: true,
              },
            },
          },
        },
      },
    });

    return userCart;
  }

  async addCart(productItemId: number, token: string) {
    if (!token) {
      return 'Авторизуйтесь, чтобы добавить товар в корзину';
    }
    const userId: number = await this.authService.getUserId(token);

    let userCart = await this.prismaService.cart.findFirst({
      where: {
        userId,
      },
    });

    if (!userCart) {
      userCart = await this.prismaService.cart.create({
        data: {
          userId,
        },
      });
    }

    const findCartItem = await this.prismaService.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: productItemId,
      },
    });

    if (findCartItem) {
      return 'Товар уже добавлен в корзину';
    } else {
      await this.prismaService.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: productItemId,
        },
      });
      return 'Товар успешно добавлен в корзину';
    }
  }

  async deleteCart(productItemId: number, token: string) {
    if (!token) {
      return 'Авторизуйтесь, чтобы удалить товар из корзину';
    }
    const userId: number = await this.authService.getUserId(token);

    const userCart = await this.prismaService.cart.findFirst({
      where: {
        userId,
      },
    });

    try {
      await this.prismaService.cartItem.delete({
        where: {
          id: productItemId,
          cartId: userCart.id,
        },
      });
      return 'Товар удален';
    } catch (e) {
      console.error(e);
      return 'Товар не найден удален';
    }
  }

  async updateCart(productItemId: number, quantity: number, token: string) {
    if (!token) {
      return 'Авторизуйтесь, чтобы обновить количество товара в корзине';
    }
    const userId: number = await this.authService.getUserId(token);

    const userCart = await this.prismaService.cart.findFirst({
      where: {
        userId,
      },
    });

    try {
      await this.prismaService.cartItem.update({
        where: {
          id: productItemId,
          cartId: userCart.id,
        },
        data: {
          quantity,
        },
      });
      return 'Количество товара обновлено';
    } catch (e) {
      console.error(e);
      return 'Не удалось обновить количество товара';
    }
  }
}
