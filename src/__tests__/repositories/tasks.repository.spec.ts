import { TaskRepositoryDb } from '@app/core/db-repositories/tasks-repository.interface';
import { MongoInMemory } from '@app/infra/db/mongoose/mongo-memory/mongo-memory.service';
import { MongooseTaskRepository } from '@app/infra/db/mongoose/repositories/tasks.repository';
import { faker } from '@faker-js/faker';
import { taskFactory } from '../factories/task.factory';

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

  it('Should create task with success', async () => {
    const beforeCreate = taskFactory();

    const task = await repository.create(beforeCreate);

    expect(task).toBeTruthy();

    expect(task.name).toBe(beforeCreate.name);

    expect(task.project).toBeTruthy();
  });

  it('Should find one task with success', async () => {
    const project = await repository.create(taskFactory());

    const finded = await repository.findOne(project._id);

    expect(finded).toBeTruthy();

    expect(finded._id).toBe(project._id);
  });

  it('Should find all taks without projects', async () => {
    const randomNumber: number = faker.number.int({ max: 50 });

    await Promise.allSettled(
      Array.from({ length: randomNumber }).map(() => {
        return repository.create(taskFactory());
      }),
    );

    const { items, meta } = await repository.findAll({});

    expect(items).toHaveLength(randomNumber);

    expect(meta.quantityItems).toBe(randomNumber);
  });
});
