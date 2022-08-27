import { Module } from '@nestjs/common';
import { DbModule, ReponseModule } from 'src/services';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [ReponseModule, DbModule],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
