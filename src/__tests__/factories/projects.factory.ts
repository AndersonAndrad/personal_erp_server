import { Project } from '@app/core/interfaces/project.interface';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const projectFactory = (): Omit<Project, '_id'> => {
  return {
    enabled: faker.datatype.boolean(),
    hoursPrice: faker.number.int({ max: 1000 }),
    name: faker.company.name(),
    tasks: [],
    expectedHoursPerDay: faker.number.int({ max: 100 }),
    hashId: uuidv4(),
  };
};

export const fullProject = (): Project => {
  return {
    ...projectFactory(),
    _id: new mongoose.Types.ObjectId() as any,
  };
};
