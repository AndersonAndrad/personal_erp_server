import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DataOptions {
  /**
   * Endereço do banco de dados Mongo.
   */
  uri: string;

  constructor(config: ConfigService) {
    this.uri = config.get<string>('MONGO_URI') ?? '';

    this.validate();
  }

  private validate() {
    if (!this.uri) {
      throw Error(`${DataOptions.name} - Invalid options`);
    }
  }
}
