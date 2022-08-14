import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { DbModule, ReponseModule } from 'src/services';

@Module({
  imports: [ReponseModule, DbModule],
  providers: [BlogsService],
  controllers: [BlogsController]
})
export class BlogsModule {}
