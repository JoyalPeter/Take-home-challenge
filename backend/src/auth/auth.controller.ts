import { LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('signin')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async login(@Body() loginDTO: LoginDTO): Promise<{ access_token: string }> {
    const { username, password } = loginDTO;
    const user = await this.authService.validateUser(username, password);
    return await this.authService.generateAccessToken(user.userID);
  }
}
