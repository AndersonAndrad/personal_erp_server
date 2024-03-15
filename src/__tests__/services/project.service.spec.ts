import {
  ProjectRepositoryDb,
  ProjectRepositorySymbol,
} from '@app/core/db-repositories/project-repository.interface';

import { ProjectService } from '@app/applications/projects/services/projects.service';
import { MongooseProjectRepository } from '@app/infra/db/mongoose/repositories/project.repository';
import { Test } from '@nestjs/testing';
import { projectFactory } from '../factories/projects.factory';

describe(`${ProjectService.name}`, () => {
  let service: ProjectService;
  let repository: ProjectRepositoryDb;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: ProjectRepositorySymbol,
          useClass: MongooseProjectRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<ProjectService>(ProjectService);
    repository = moduleRef.get<ProjectRepositoryDb>(ProjectRepositorySymbol);

    repository = {
      create: jest.fn(),
      delete: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be call create with correct params', async () => {
    jest.setTimeout(2000);
    const project = projectFactory();

    await service.create(project);

    expect(repository.create).toHaveBeenCalledTimes(1);
  });
});
