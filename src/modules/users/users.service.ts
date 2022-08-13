import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { DbService } from '../../services/db/db.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
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

            return await this.connection.executeQuery('SELECT public.fn_signup($1)', [JSON.stringify(payload)]);
        } catch (err) {
            throw new Error(err);
        }
    }
}
