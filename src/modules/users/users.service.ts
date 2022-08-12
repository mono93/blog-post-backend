import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { DbService } from '../../services/db/db.service';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Injectable()
export class UsersService {

    constructor(
        private connection: DbService,
        private firebase: FirebaseService
    ) { }

    signUp = async (_userDto: UserDto) => {
        try {
            const response = await this.firebase.registerWithEmailAndPassword(_userDto.email, _userDto.password);
            const res = await this.connection.executeQuery(`SELECT * FROM public."blog-post-user-details"`);
            console.log('result', res)
        } catch (err) {
            console.error('Error -> ', err)
        }
    }
}
