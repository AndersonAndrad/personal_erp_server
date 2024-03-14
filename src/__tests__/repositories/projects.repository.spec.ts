import { ProjectRepositoryDb } from '@app/core/db-repositories/project-repository.interface';
import { MongoInMemory } from '@app/infra/db/mongoose/mongo-memory/mongo-memory.service';
import { MongooseProjectRepository } from '@app/infra/db/mongoose/repositories/project.repository';
import { faker } from '@faker-js/faker';
import { projectFactory } from '../factories/projects.factory';

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

  it('Should create a project with success', async () => {
    const project = projectFactory();

    const projectCreated = await repository.create(project);

    expect(projectCreated).toBeTruthy();

    expect(projectCreated.name).toBe(project.name);

    expect(project.enabled).toBe(project.enabled);
  });

  it('Should find one project with success', async () => {
    const project = projectFactory();

    const projectCreated = await repository.create(project);

    const projectFinded = await repository.findOne(projectCreated._id);

    expect(projectFinded).toBeTruthy();

    expect(projectFinded._id).toBe(projectCreated._id);
  });

  it('Should find all projects without paginate with success', async () => {
    const project = projectFactory();

    const projectCreated = await repository.create(project);

    const { items, meta } = await repository.findAll({});
    const [firstItem] = items;

    expect(items).toHaveLength(1);

    expect(meta.quantityItems).toBe(1);

    expect(firstItem._id).toBe(projectCreated._id);
  });

  it('Should check returning all items when search by find all without paginate', async () => {
    const counter: number = faker.number.int({ max: 50 });
    await Promise.allSettled(
      Array.from({ length: counter }).map(() => {
        return repository.create(projectFactory());
      }),
    );

    const { items, meta } = await repository.findAll({});

    expect(items).toHaveLength(counter);

    expect(meta.quantityItems).toBe(counter);
  });

  it('Should update project with success', async () => {
    const project = projectFactory();

    const projectCreated = await repository.create(project);

    expect(projectCreated).toBeTruthy();

    expect(project.name).toBe(projectCreated.name);

    const nameUpdated: string = faker.person.fullName();

    await repository.update(projectCreated._id, { name: nameUpdated });

    const projectUpdated = await repository.findOne(projectCreated._id);

    expect(projectUpdated.name).toBe(nameUpdated);
  });

  it('Should delete project with success', async () => {
    const project = await repository.create(projectFactory());

    expect(project).toBeTruthy();

    await repository.delete(project._id);

    const { items } = await repository.findAll({});

    expect(items).toHaveLength(0);
  });
});
