import { ZodError, z } from 'zod';

import { BadRequestException } from '@nestjs/common';
import { Project } from '../interfaces/project.interface';

export class ProjectSchemaValidator {
  private createProjectValidateSchema = z.object({
    name: z.string().min(3),
    hoursPrice: z.number().int(),
  });

  private updateProjectValidateSchema = z.object({
    name: z.string().min(3).optional(),
    hoursPrice: z.number().int().optional(),
  });

  private validateSchemaId = z.string().length(24);

  createProjectValidate(project: Omit<Project, '_id' | 'tasks' | 'enabled' | 'hashId'>) {
    try {
      this.createProjectValidateSchema.parse(project);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(JSON.parse(error.message));
      }
      throw error;
    }
  }

  updateProjectValidate(project: Partial<Omit<Project, 'tasks'>>) {
    try {
      this.updateProjectValidateSchema.parse(project);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(JSON.parse(error.message));
      }
      throw error;
    }
  }

  idProjectValidate(projectId: Project['_id']) {
    try {
      this.validateSchemaId.parse(projectId);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(JSON.parse(error.message));
      }
      throw error;
    }
  }
}
