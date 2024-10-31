import { Body, Controller, NotFoundException, Post, Res } from '@nestjs/common';
import { UsersService } from 'src/domain/users/users.service';
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/send-magic-link')
  async sendMagicLink(@Body() body: { email: string }) {
    return await this.usersService.createVerificationToken(body.email);
  }

  @Post('/validate-token')
  async verifyEmail(
    @Body() body: { email: string, token: string },
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    const result = await this.usersService.verifyEmail(body);

    if (!result) {
      throw new NotFoundException('Token not found');
    }

    // set cookies
    res.setCookie('token', result.session.token, { httpOnly: true, secure: true });
    res.setCookie('refreshToken', result.session.refreshToken, { httpOnly: true, secure: true });
    res.setCookie('userId', result.user.id, { httpOnly: true, secure: true });

    return result;
  }
}
