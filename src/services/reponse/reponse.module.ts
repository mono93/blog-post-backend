import { Module } from '@nestjs/common';
import { ReponseService } from './reponse.service';

@Module({
  providers: [ReponseService],
  exports: [ReponseService]
})
export class ReponseModule {}
