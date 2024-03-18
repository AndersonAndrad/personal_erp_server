import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateProjectDto } from '@app/core/dto/projects/create-projects.dto';
import { UpdateProjectDto } from '@app/core/dto/projects/update-projects.dto';
import { Filter, Project } from '@app/core/interfaces/project.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './services/projects.service';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('')
  @ApiOperation({ summary: 'Create a project' })
  create(@Body() projectDto: CreateProjectDto) {
    return this.projectService.create(projectDto);
  }

  @Get('find-all')
  @ApiOperation({ summary: 'Find all projects' })
  findAll(@Query() filter: Filter) {
    return this.projectService.findAll(filter);
  }

  @Get(':projectId')
  @ApiOperation({ summary: 'Get project by id' })
  findOne(@Param('projectId') projectId: Project['_id']) {
    return this.projectService.findOne(projectId);
  }

  @Patch(':projectId')
  @ApiOperation({ summary: 'Update project parts' })
  update(@Param('projectId') projectId: Project['_id'], @Body() project: UpdateProjectDto) {
    return this.projectService.update(projectId, project);
  }

  @Delete(':projectId')
  @ApiOperation({ summary: 'Delete a project' })
  delete(@Param('projectId') projectId: Project['_id']) {
    return this.projectService.delete(projectId);
  }
}
