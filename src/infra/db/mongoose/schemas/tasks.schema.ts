import { Pause, Task, TaskNotation } from '@app/core/interfaces/tasks.interface';

import mongoose from 'mongoose';
import { ProjectSchema } from './project.schema';

const NotationSchema = new mongoose.Schema<TaskNotation>({
  notation: { type: String, required: true },
});

const PauseSchema = new mongoose.Schema<Pause>({
  end: { type: Date },
  start: { type: Date, required: true },
});

export const TasksSchema = new mongoose.Schema<Task>({
  description: { type: String, required: true },
  finish: { type: Date },
  finished: { type: Boolean, default: false },
  name: { type: String, required: true },
  notations: { type: [NotationSchema] },
  paused: { type: Boolean, default: false },
  project: { type: ProjectSchema },
  start: { type: Date, default: new Date() },
  pauses: { type: [PauseSchema] },
});

export const TasksModel: mongoose.Model<Task> = mongoose.model('tasks', TasksSchema);
