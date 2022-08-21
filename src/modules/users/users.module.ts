import { Module } from '@nestjs/common';
import { ReponseModule, DbModule } from '../../services';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ReponseModule, DbModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
