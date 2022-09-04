import { Injectable } from '@nestjs/common';
import { DbService } from 'src/services';
import { GetProfileDto, SetProfileDto } from './dto/profile.dto';

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

    setProfileDetails = async (setProfileDto: SetProfileDto, email: string) => {
        try {
            let payload = {
                user_first_name: setProfileDto.firstName,
                user_last_name: setProfileDto.lastName,
                user_email: email,
                dob: setProfileDto.dateOfBirth,
                gender: setProfileDto.gender,
            }
            return await this.connection.executeQuery('fn_set_user_details', [JSON.stringify(payload)]);
        } catch (err) {
            throw new Error(err);
        }
    }
}
