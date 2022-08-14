import { Controller, Get, HttpStatus, Query, Res} from '@nestjs/common';
import { Response } from 'express';
import { ReponseService } from 'src/services';
import { BlogsService } from './blogs.service';
import { GetBlogDetailsDto } from './dto/blogs.dto';

@Controller('blogs')
export class BlogsController {
    constructor(
        private blogService: BlogsService,
        private apiReponse: ReponseService,
    ) { }

    @Get('get-blog-details')
    async getUser(
        @Query() _getBlogDetailDto: GetBlogDetailsDto,
        @Res() res: Response
    ): Promise<any> {
        try {
            const response = await this.blogService.getUserDetails(_getBlogDetailDto);
            return this.apiReponse.success(res, HttpStatus.OK, response.msg, response.data)
        } catch (err) {
            return this.apiReponse.success(res, HttpStatus.INTERNAL_SERVER_ERROR, err.message)
        }
    }

}
