import { Controller, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, UserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller()
@ApiTags("Users")
export class UsersController {
    constructor(
        private userService: UsersService
    ) { }

    @Post('signup')
    async signup(
        @Query() userDto: UserDto
    ): Promise<any> {
        return this.userService.signUp(userDto);
    }


    @Post('login')
    async login(
        @Query() loginDto: LoginDto
    ): Promise<any> {
        return null;
    }
}
