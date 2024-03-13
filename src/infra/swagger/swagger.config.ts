import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { INestApplication } from '@nestjs/common';

class SwaggerConfig {
  private config = new DocumentBuilder()
    .setTitle('Personal SaaS')
    .setDescription('')
    .setVersion('0.1')
    .addTag('')
    .build();

  initSwagger(application: INestApplication): void {
    const document = SwaggerModule.createDocument(application, this.config);

    SwaggerModule.setup('api-doc', application, document);
  }
}

const swaggerConfig = new SwaggerConfig();

export default swaggerConfig;
