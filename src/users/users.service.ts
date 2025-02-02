import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { GetSessionInfoDto } from 'src/auth/dto/getSessionInfo.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });
  }

  async createUser(dto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
      },
    });
  }

  async getProfile(session: GetSessionInfoDto) {
    const user: User = await this.getUserByEmail(session.email);

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const response = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      sex: user.sex,
    };

    return response;
  }
}
