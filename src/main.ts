import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import swaggerConfig from './infra/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerConfig.initSwagger(app);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
