import { ZodError, z } from 'zod';
import { Task, TaskNotation } from '../interfaces/tasks.interface';

import { BadRequestException } from '@nestjs/common';

export class TasksSchemaValidator {
  private validateSchemaId = z.string().length(24);

  idEntityValidate(taskId: Task['_id']) {
    try {
      this.validateSchemaId.parse(taskId);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(JSON.parse(error.message));
      }
      throw error;
    }
  }

  createTasksValidate(task: Pick<Task, 'name' | 'description' | 'project'>) {
    try {
      const createTasksValidateSchema = z.object({
        name: z.string().min(3),
        description: z.string().min(3),
        project: z.object({
          _id: z.string().min(24),
          name: z.string().min(3),
          hoursPrice: z.number().int(),
        }),
      });

      createTasksValidateSchema.parse(task);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(JSON.parse(error.message));
      }
      throw error;
    }
  }

  updateTasksValidate(task: Partial<Omit<Task, 'start'>>) {
    try {
      const updateTasksValidateSchema = z.object({
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

      updateTasksValidateSchema.parse(task);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(JSON.parse(error.message));
      }
      throw error;
    }
  }

  addNotationValidate(taskId: Task['_id'], notationObject: Pick<TaskNotation, 'notation'>) {
    try {
      const notationSchema = z.object({
        notation: z.string().min(3),
      });

      this.idEntityValidate(taskId);
      notationSchema.parse(notationObject);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(JSON.parse(error.message));
      }
      throw error;
    }
  }
}
