import { Task, TaskNotation } from '@app/core/interfaces/tasks.interface';

import { faker } from '@faker-js/faker';
import { fullProject } from './projects.factory';

export const taskFactory = (): Omit<Task, '_id'> => {
  return {
    name: faker.company.name(),
    description: faker.person.jobDescriptor(),
    project: fullProject(),
    start: faker.date.recent(),
    finished: faker.datatype.boolean(),
    paused: faker.datatype.boolean(),
    notations: [],
    pauses: [],
  };
};

export const notationFactory = (): Omit<TaskNotation, '_id'> => {
  return {
    notation: faker.company.catchPhrase(),
  };
};
