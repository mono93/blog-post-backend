import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AppRoutingModule } from './routes/routes';
import { ConfigModule } from '@nestjs/config';
import { DbModule, FirebaseModule, ReponseModule } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DbModule,
    FirebaseModule,
    ReponseModule,
    UsersModule,
    AppRoutingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
