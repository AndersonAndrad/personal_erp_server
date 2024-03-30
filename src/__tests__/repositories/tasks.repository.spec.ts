import { notationFactory, taskFactory } from '../factories/task.factory';

import { TaskRepositoryDb } from '@app/core/db-repositories/tasks-repository.interface';
import { MongoInMemory } from '@app/infra/db/mongoose/mongo-memory/mongo-memory.service';
import { MongooseTaskRepository } from '@app/infra/db/mongoose/repositories/mongoose-tasks.repository';
import { faker } from '@faker-js/faker';

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

  it('Should update a task with success', async () => {
    let task = await repository.create(taskFactory());

    const name: string = faker.person.fullName();

    await repository.update(task._id, { name });

    task = await repository.findOne(task._id);

    expect(task.name).toBe(name);
  });

  it('Should delete a task with sucess', async () => {
    const task = await repository.create(taskFactory());

    await repository.delete(task._id);

    const { items } = await repository.findAll({});

    expect(items).toHaveLength(0);
  });

  it('Should toggle task status', async () => {
    let task = await repository.create(taskFactory());

    const statusBeforeChange: boolean = task.paused;

    await repository.toggleStatusPause(task._id);

    task = await repository.findOne(task._id);

    const statusAfterChange: boolean = task.paused;

    expect(statusBeforeChange).not.toBe(statusAfterChange);
  });

  it('Should add notation in task', async () => {
    let task = await repository.create(taskFactory());
    const { notation } = notationFactory();

    await repository.addNotation(task._id, { notation });

    task = await repository.findOne(task._id);

    expect(task.notations.some(({ notation: taskNotaiton }) => taskNotaiton === notation)).toBeTruthy();
  });

  it('Should finish task with success', async () => {
    let task = await repository.create(taskFactory());

    await repository.finishTask(task._id);

    task = await repository.findOne(task._id);

    expect(task.finished).toBeTruthy();

    const today = new Date().getDate();

    expect(new Date(task.finish).getDate()).toBe(today);
  });
});
