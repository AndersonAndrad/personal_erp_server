import { ZodError, z } from 'zod';
import { Task, TaskNotation } from '../interfaces/tasks.interface';

import { BadRequestException } from '@nestjs/common';

export class TasksSchemaValidator {
  private createTasksValidateSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
    project: z.object({
      _id: z.string().min(24),
      name: z.string().min(3),
      hoursPrice: z.number().int(),
    }),
    start: z.date(),
    finish: z.date().optional(),
    finished: z.boolean(),
    paused: z.boolean(),
  });

  private updateTasksValidateSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(3).optional(),
    project: z
      .object({
        _id: z.string().min(24).optional(),
        name: z.string().min(3).optional(),
        hoursPrice: z.number().int().optional(),
      })
      .optional(),
    finish: z.date().optional().optional(),
    finished: z.boolean().optional(),
    paused: z.boolean().optional(),
  });

  private validateSchemaId = z.string().length(24);

  idProjectValidate(projectId: Task['_id']) {
    try {
      this.validateSchemaId.parse(projectId);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(JSON.parse(error.message));
      }
      throw error;
    }
  }

  createTasksValidate(task: Omit<Task, '_id' | 'notation'>) {
    try {
      this.createTasksValidateSchema.parse(task);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(JSON.parse(error.message));
      }
      throw error;
    }
  }

  updateTasksValidate(task: Partial<Omit<Task, 'start'>>) {
    try {
      this.updateTasksValidateSchema.parse(task);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(JSON.parse(error.message));
      }
      throw error;
    }
  }

  addNotationValidate(taskId: Task['_id'], notation: Pick<TaskNotation, 'notation'>) {
    const schema = z.string().min(3);

    try {
      this.validateSchemaId.parse(taskId);
      schema.parse(notation);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(JSON.parse(error.message));
      }
      throw error;
    }
  }
}
