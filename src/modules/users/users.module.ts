import { Module } from '@nestjs/common';
import { DbModule } from 'src/services/db/db.module';
import { FirebaseModule } from 'src/services/firebase/firebase.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DbModule, FirebaseModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
