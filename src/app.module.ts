import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRoutingModule } from './routes/routes';
import { ConfigModule } from '@nestjs/config';
import { UsersModule, BlogsModule, ProfileModule } from './modules';
import { DbModule, ReponseModule } from './services';
import { PreauthMiddleware } from './middleware/preauth.middleware';
import { BlogsController } from './modules/blogs/blogs.controller';
import { ProfileController } from './modules/profile/profile.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DbModule,
    ReponseModule,
    UsersModule,
    BlogsModule,
    ProfileModule,
    AppRoutingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PreauthMiddleware)
      .exclude('/auth/(.*)')
      .forRoutes(
        BlogsController,
        ProfileController
      );
  }
}
