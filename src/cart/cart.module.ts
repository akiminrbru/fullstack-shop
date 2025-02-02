import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { PrismaService } from 'src/prisma.service';
import { CartController } from './cart.controller';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    PrismaService,
    UsersService,
    AuthService,
    MailService,
  ],
})
export class CartModule {}
