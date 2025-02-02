import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { GetSessionInfoDto } from 'src/auth/dto/getSessionInfo.dto';
import { SessionInfo } from 'src/auth/session-info.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@SessionInfo() session: GetSessionInfoDto) {
    return this.usersService.getProfile(session);
  }
}
