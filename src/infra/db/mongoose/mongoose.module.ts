import { Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';

import { DataOptions } from './mongoose.options';
import mongoose from 'mongoose';

@Module({ providers: [DataOptions] })
export class MongooseModuleConfiguration implements OnApplicationBootstrap, OnApplicationShutdown {
  constructor(private options: DataOptions) {}

  async onApplicationShutdown(signal?: string) {
    await mongoose.disconnect();
  }

  async onApplicationBootstrap() {
    mongoose.set('runValidators', true);

    await mongoose.connect(this.options.uri, {
      maxPoolSize: 1000,
      minPoolSize: 100,
      maxIdleTimeMS: 30000,
    });

    /**
     * @TODO - implement to print logger by mongoose
     */
    // mongoose.set('debug', (collectionName, method, query) => {
    // this.logger.log(`Mongoose: ${collectionName}.${method}`, {
    //   extraParams: {
    //     method,
    //     collection: collectionName,
    //     queryMongo: JSON.stringify(query),
    //   },
    // });
    // });
  }
}
