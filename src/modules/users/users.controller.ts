import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
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
        private apiReponse: ReponseService
    ) { }

    @Post('signup')
    async signup(
        @Body() userDto: UserDto,
        @Res() res: Response
    ): Promise<any> {
        try {
            const response = await this.userService.signUp(userDto);
            if (response.msg_id === 1) {
                return this.apiReponse.success(res, HttpStatus.CREATED, `User Signup Succesful, an verfication mail will be sent to ${userDto.email}`)
            } else {
                return this.apiReponse.success(res, HttpStatus.NOT_FOUND, 'User Already Exist')
            }
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
            const response = await this.userService.emailVerify(_verifyEmailDto);
            if (response.msg_id === 1) {
                return this.apiReponse.success(res, HttpStatus.OK, `Email verification done`);
            } else {
                return this.apiReponse.success(res, HttpStatus.NOT_FOUND, `Email verification already done`);
            }
        } catch (err) {
            return this.apiReponse.success(res, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
        }
    }

    @Get('is-user-available-for-login')
    async isUserAvailable(
        @Query() _getUserEmailDto: VerifyEmailDto,
        @Res() res: Response
    ): Promise<any> {
        try {
            const response = await this.userService.isUserAvailable(_getUserEmailDto);
            if (response.msg_id === 1) {
                return this.apiReponse.success(res, HttpStatus.OK, response.msg, response.data);
            } else {
                return this.apiReponse.success(res, HttpStatus.NOT_FOUND, 'User not Available');
            }

        } catch (err) {
            return this.apiReponse.success(res, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
        }
    }

}
