import { Controller } from '@nestjs/common';

import { ProjectService } from './services/projects.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
}
