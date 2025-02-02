import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@mail.ru', description: 'Email пользователя' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123123', description: 'Пароль пользователя' })
  @Length(6, 50, {
    message: 'Password length Must be between 6 and 50 charcters',
  })
  password: string;
}
