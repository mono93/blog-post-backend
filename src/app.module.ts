import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AppRoutingModule } from './routes/routes';
import { DbModule } from './services/db/db.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './services/firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DbModule,
    FirebaseModule,
    UsersModule,
    AppRoutingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
