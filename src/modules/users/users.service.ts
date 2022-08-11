import { Injectable } from '@nestjs/common';
import { DbService } from 'src/services/db/db.service';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {

    constructor(
        private connection: DbService
    ) { }

    signUp = async (_userDto: UserDto) => {
        try {
            const res = await this.connection.executeQuery(`SELECT * FROM public."blog-post-user-details"`);
            console.log('result', res)
        } catch (err) {
            console.error('Error -> ', err)
        }
    }
}
