import { Project } from './project.interface';

export interface Task {
  _id: string;
  name: string;
  description: string;
  project: Omit<Project, 'enabled' | 'tasks'>;
  start?: Date;
  finish?: Date;
  finished: boolean;
  paused: boolean;
  notations: TaskNotation[];
  pauses: Pause[];
  scheduled: boolean;
}

export interface TaskNotation {
  _id: string;
  notation: string;
}

export interface Pause {
  _id: string;
  start: Date;
  end?: Date;
  activityBeforePause?: string;
}

export interface Filter {
  hashId?: Project['hashId'][];
  start?: Date;
  finish?: Date;
  scheduled?: boolean;
}
