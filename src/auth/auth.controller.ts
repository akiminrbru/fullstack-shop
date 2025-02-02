import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaService } from 'src/prisma.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { MailService } from 'src/mail/mail.service';
import { CookieService } from './cokkie.service';
import { Response } from 'express';
import { GetSessionInfoDto } from './dto/getSessionInfo.dto';
import { SessionInfo } from './session-info.decorator';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService,
    private mailService: MailService,
    private cookieService: CookieService,
  ) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201 })
  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    const user = await this.authService.register(userDto);
    const { accessToken } = await this.authService.generateToken(user);
    this.mailService.sendConfirmationEmail(user.email, accessToken);
    return { message: 'Пожалуйста, проверьте вашу почту для подтверждения.' };
  }

  @ApiOperation({ summary: 'Вход' })
  @ApiResponse({ status: 200 })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signIn(userDto);
    this.cookieService.setToken(res, accessToken);
  }

  @ApiOperation({ summary: 'Подтверждение учетной записи' })
  @Get('confirm')
  async confirm(
    @Query('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.confirmUser(token);
    if (user) {
      // const { accessToken } = await this.authService.signIn(user);
      // this.cookieService.setToken(res, accessToken);
      return res.redirect(`${process.env.CLIENT_URL}verify?verified=success`);
    } else {
      return res.redirect(`${process.env.CLIENT_URL}verify?verified=error`);
    }
  }

  @ApiOperation({ summary: 'Сессия' })
  @Get('session')
  @ApiOkResponse({
    type: GetSessionInfoDto,
  })
  @UseGuards(AuthGuard)
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }

  @ApiOperation({ summary: 'Выход' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @ApiOperation({ summary: 'Смена пароля' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  @Post('changePassword')
  changePassword(@Body() dto: ChangePasswordDto, @Request() req) {
    return this.authService.changePassword(dto, req.user.email);
  }
}
