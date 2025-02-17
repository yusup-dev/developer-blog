import { Body, Controller, Post } from "@nestjs/common";
import { ApiOkResponse, ApiProperty, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthEntity } from "./entity/auth.entity";
import { LoginDto } from "./dto/login.dto";


@Controller('auth')
@ApiTags('auth')
export class AuthController{
  constructor(private readonly authService: AuthService){}

  @Post('login')  
  @ApiOkResponse({type: AuthEntity})
  login(@Body() {email, password}: LoginDto){
    return this.authService.login(email, password);
  }
}