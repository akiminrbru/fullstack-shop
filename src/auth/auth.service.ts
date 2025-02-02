import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  private saltOrRounds = 10;

  async register(userDto: CreateUserDto): Promise<User> {
    const candidate = await this.usersService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordHash = await this.hashPassword(userDto.password);

    const newUser = await this.usersService.createUser({
      ...userDto,
      password: passwordHash,
    });

    if (!newUser) {
      throw new HttpException(
        'Произошла ошибка при регистрации нового пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }

    return newUser;
  }

  async signIn(userDto: CreateUserDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async getUserId(token: string) {
    const user = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    return user.id;
  }

  async changePassword(dto: ChangePasswordDto, email: string) {
    const user: User = await this.usersService.getUserByEmail(email);

    const currentPasswordEquals = this.checkPassword(
      user.password,
      dto.currentPassword,
    );

    if (!currentPasswordEquals) {
      throw new HttpException(
        'Вы ввели неверный пароль',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.user.update({
      where: { email },
      data: { password: await this.hashPassword(dto.newPassword) },
    });

    return { message: 'Пароль успешно изменен' };
  }

  async confirmUser(token: string): Promise<User | null> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.getUserByEmail(payload.email);
      if (user) {
        await this.prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            verifyed: true,
          },
        });
        return user;
      }
      return null;
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Произошла ошибка при верификации пользователя',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltOrRounds);
  }

  async generateToken(user: User) {
    const payload = { id: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user: User = await this.usersService.getUserByEmail(userDto.email);

    if (!user) {
      throw new HttpException(
        'Пользователь с таким email не существует',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!user.verifyed) {
      const { accessToken } = await this.generateToken(user);
      await this.mailService.sendConfirmationEmail(user.email, accessToken);
      throw new UnauthorizedException(
        'Ваш email не подтвержден. Пожалуйста, проверьте вашу почту и подтвердите адрес.',
      );
    }

    const passwordEquals = await this.checkPassword(
      userDto.password,
      user.password,
    );

    if (!passwordEquals) {
      throw new UnauthorizedException({
        message: 'Неверный email или пароль',
      });
    }

    return user;
  }

  private async checkPassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(currentPassword, newPassword);
  }
}
