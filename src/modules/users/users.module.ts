import { Module } from '@nestjs/common';
import { DbModule } from 'src/services/db/db.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
