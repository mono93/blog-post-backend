import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ReponseService } from 'src/services';
import { GetProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller()
@ApiTags("Profiles")
export class ProfileController {

    constructor(
        private profileService: ProfileService,
        private apiReponse: ReponseService
    ) { }

    @Get('get-profile-details')
    @ApiBearerAuth()
    async getUser(
        @Query() getProfileDto: GetProfileDto,
        @Res() res: Response
    ): Promise<any> {
        try {
            const response = await this.profileService.getProfileDetails(getProfileDto);
            if (response.msg_id === 1) {
                return this.apiReponse.success(res, HttpStatus.OK, response.msg, response.data);
            } else {
                return this.apiReponse.success(res, HttpStatus.NOT_FOUND, `User Not Found`);
            }
        } catch (err) {
            return this.apiReponse.success(res, HttpStatus.INTERNAL_SERVER_ERROR, err.message);
        }
    }
}
