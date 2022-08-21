import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRoutingModule } from './routes/routes';
import { ConfigModule } from '@nestjs/config';
import { UsersModule, BlogsModule } from './modules';
import { DbModule, ReponseModule } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DbModule,
    ReponseModule,
    UsersModule,
    BlogsModule,
    AppRoutingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
