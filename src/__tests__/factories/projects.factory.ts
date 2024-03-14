import { faker } from '@faker-js/faker';

import { Project } from '@app/core/interfaces/project.interface';

export const projectFactory = (): Omit<Project, '_id'> => {
  return {
    enabled: faker.datatype.boolean(),
    hoursPrice: faker.number.int({ max: 1000 }),
    name: faker.company.name(),
    tasks: [],
  };
};
