import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: '123123', description: 'Текущий пароль' })
  @Length(6, 50, {
    message: 'Password length Must be between 6 and 50 charcters',
  })
  currentPassword: string;

  @ApiProperty({ example: '123123', description: 'Новый пароль' })
  @Length(6, 50, {
    message: 'Password length Must be between 6 and 50 charcters',
  })
  newPassword: string;
}
