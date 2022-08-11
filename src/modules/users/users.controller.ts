import { Controller, Get, Query } from '@nestjs/common';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller()
@ApiBasicAuth()
@ApiTags("Users")
export class UsersController {
    constructor(
        private userService: UsersService
    ) { }

    @Get('signup')
    async signup(
        @Query() userDto: UserDto
    ): Promise<any> {
        console.log(userDto)
        return this.userService.signUp(userDto);
    }

}
