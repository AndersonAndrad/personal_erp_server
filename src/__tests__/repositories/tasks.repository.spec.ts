import { TaskRepositoryDb } from '@app/core/db-repositories/tasks-repository.interface';
import { MongoInMemory } from '@app/infra/db/mongoose/mongo-memory/mongo-memory.service';
import { MongooseTaskRepository } from '@app/infra/db/mongoose/repositories/tasks.repository';

describe(`${MongooseTaskRepository.name}`, () => {
  let repository: TaskRepositoryDb;
  let mongoInMemory: MongoInMemory;

  beforeAll(async () => {
    jest.setTimeout(2000);
    mongoInMemory = await MongoInMemory.startServer();
  });

  beforeEach(async () => {
    await mongoInMemory.clearCollections();
    repository = new MongooseTaskRepository();
  });

  afterAll(async () => {
    await mongoInMemory.shutdown();
  });

  it('Should be defined', () => {
    expect(repository).toBeDefined();
  });
});
