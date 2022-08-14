import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserDto, VerifyEmailDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { ReponseService } from '../../services';

@Controller()
@ApiTags("Users")
export class UsersController {
    constructor(
        private userService: UsersService,
        private apiReponse: ReponseService,
    ) { }

    @Post('signup')
    async signup(
        @Body() userDto: UserDto,
        @Res() res: Response
    ): Promise<any> {
        try {
            let payload = {
                ...userDto,
                password: Buffer.from(userDto.password, 'base64').toString()
            }
            await this.userService.signUp(payload);
            return this.apiReponse.success(res, HttpStatus.CREATED, `User Signup Succesful, an verfication mail will be sent to ${userDto.email}`)
        } catch (err) {
            return this.apiReponse.success(res, HttpStatus.INTERNAL_SERVER_ERROR, err.message)
        }
    }

    @Post('email-verify')
    async emailVerify(
        @Body() _verifyEmailDto: VerifyEmailDto,
        @Res() res: Response
    ): Promise<any> {
        try {
            await this.userService.emailVerify(_verifyEmailDto);
            return this.apiReponse.success(res, HttpStatus.OK, `Email verification done`)
        } catch (err) {
            return this.apiReponse.success(res, HttpStatus.INTERNAL_SERVER_ERROR, err.message)
        }
    }

}
