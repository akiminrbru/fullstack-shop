import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(email: string, token: string) {
    const url = `${process.env.BASE_URL}api/auth/confirm?token=${token}`;
    const subject = 'Подтверждение регистрации';
    const html = `<a href="${url}">Подтвердите свою учетную запись</a>`;

    this.mailerService
      .sendMail({
        from: 'pookonchaniyu@yandex.ru',
        to: email,
        subject,
        html,
      })
      .then(() => {
        return { message: 'Письмо успешно отправлено' };
      })
      .catch(() => {
        throw new HttpException('Произошла ошибка при отправке письма', 500);
      });
  }
}
