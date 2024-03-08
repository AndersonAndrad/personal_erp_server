import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModuleConfiguration } from './infra/db/mongoose/mongoose.module';

@Module({
  imports: [
    MongooseModuleConfiguration,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'variaveis.ini'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
