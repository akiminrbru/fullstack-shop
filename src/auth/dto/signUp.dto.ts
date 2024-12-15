import { IsEmail, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @Length(6, 50, {
    message: 'Password length Must be between 6 and 50 charcters',
  })
  password: string;
}
