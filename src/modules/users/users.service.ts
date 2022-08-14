import { Injectable } from '@nestjs/common';
import { UserDto, VerifyEmailDto } from './dto/users.dto';
import { DbService, FirebaseService } from '../../services';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {

    constructor(
        private connection: DbService,
        private firebase: FirebaseService
    ) { }

    signUp = async (_userDto: UserDto) => {
        try {
            await this.firebase.registerWithEmailAndPassword(_userDto.email, _userDto.password);

            let payload = {
                user_id: uuidv4(),
                user_first_name: _userDto.firstName,
                user_last_name: _userDto.lastName,
                user_email: _userDto.email,
                dob: _userDto.dateOfBirth,
                gender: _userDto.gender,
                signup_provider: 'email'
            }

            return await this.connection.executeQuery('fn_signup', [JSON.stringify(payload)]);
        } catch (err) {
            throw new Error(err);
        }
    }

    emailVerify = async (_verifyEmailDto: VerifyEmailDto) => {
        try {
            return await this.connection.executeQuery('fn_email_verification', [JSON.stringify(_verifyEmailDto)]);
        } catch (err) {
            throw new Error(err);
        }
    }

    getUserDetails = async (_getUserEmailDto: VerifyEmailDto) => {
        try {
            let payload = {
                user_email: _getUserEmailDto.email,
            }
            return await this.connection.executeQuery('fn_get_user_details', [JSON.stringify(payload)]);
        } catch (err) {
            throw new Error(err);
        }
    }
}
