import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({
		summary: 'Войти/login',
	  })
	  @ApiBody({ type: AuthUserDto })
	  @ApiResponse({ status: 200, type: Boolean })
	@Post('login')
	login(@Body() params: AuthUserDto) {
		return this.authService.login(params);
	}

	@ApiOperation({
		summary: 'Регистрация',
	  })
	  @ApiBody({ type: RegisterUserDto })
	  @ApiResponse({ status: 201, type: RegisterUserDto })
	@Post('register')
	register(@Body() params: RegisterUserDto) {
		return this.authService.register(params);
	}
}
