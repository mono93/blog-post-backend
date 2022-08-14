import { Injectable } from '@nestjs/common';
import { DbService } from 'src/services';
import { GetBlogDetailsDto } from './dto/blogs.dto';

@Injectable()
export class BlogsService {
    constructor(
        private connection: DbService,
    ) { }

    getUserDetails = async (_getBlogDetailDto: GetBlogDetailsDto) => {
        try {
            let payload = {
                user_email: _getBlogDetailDto.email,
            }
            return await this.connection.executeQuery('fn_get_blog_details', [JSON.stringify(payload)]);
        } catch (err) {
            throw new Error(err);
        }
    }
}
