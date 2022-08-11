import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const port = process.env.PORT || 8080
  const app = await NestFactory.create(AppModule);

  Logger.log('Environment: Dev', 'Bootstarp');
  app.setGlobalPrefix('api/v1');
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('The Blog Post Project')
    .setDescription('Open api for the blog post project')
    .setVersion('v1')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  Logger.log(`Server running on port ${port}`, 'Bootstarp', false);
}
bootstrap();
