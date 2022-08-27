import { Injectable } from '@nestjs/common';
import { DbService } from 'src/services';
import { GetProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {

    constructor(
        private connection: DbService,
    ) { }

    getProfileDetails = async (getProfileDto: GetProfileDto) => {
        try {
            let payload = {
                user_email: getProfileDto.email,
            }
            return await this.connection.executeQuery('fn_get_user_details', [JSON.stringify(payload)]);
        } catch (err) {
            throw new Error(err);
        }
    }
}
