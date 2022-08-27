import { Controller, Get, HttpStatus, Query, Res} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ReponseService } from 'src/services';
import { BlogsService } from './blogs.service';
import { GetBlogDetailsDto } from './dto/blogs.dto';

@Controller()
@ApiTags('Blogs')
export class BlogsController {
    constructor(
        private blogService: BlogsService,
        private apiReponse: ReponseService,
    ) { }

    @Get('get-blog-details')
    @ApiBearerAuth()
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
