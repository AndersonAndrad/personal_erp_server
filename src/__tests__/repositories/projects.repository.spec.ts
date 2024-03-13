import { ProjectRepositoryDb } from '@app/core/db-repositories/project-repository.interface';
import { MongoInMemory } from '@app/infra/db/mongoose/mongo-memory/mongo-memory.service';
import { MongooseProjectRepository } from '@app/infra/db/mongoose/repositories/project.repository';

describe(`${MongooseProjectRepository}`, () => {
  let repository: ProjectRepositoryDb;
  let mongoInMemory: MongoInMemory;

  beforeAll(async () => {
    jest.setTimeout(2000);
    mongoInMemory = await MongoInMemory.startServer();
  });

  beforeEach(async () => {
    await mongoInMemory.clearCollections();
    repository = new MongooseProjectRepository();
  });

  afterAll(async () => {
    await mongoInMemory.shutdown();
  });

  it('Should be defined', () => {
    expect(repository).toBeDefined();
  });
});
