import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import swaggerConfig from './infra/swagger/swagger.config';

async function bootstrap() {
  const logger = new Logger('InstanceLoader');

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('port') || 3000;

  swaggerConfig.initSwagger(app);

  app.enableCors();

  await app.listen(port);

  logger.debug(`Application run in port ${port}`);
}
bootstrap();
