import { ProjectService } from '@app/modules/project/services/project.service';
import { Test } from '@nestjs/testing';

describe(`${ProjectService.name}`, () => {
  let projectService: ProjectService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ProjectService],
    }).compile();

    projectService = moduleRef.get<ProjectService>(ProjectService);
  });

  it('Should be defined', () => {
    expect(projectService).toBeDefined();
  });
});
