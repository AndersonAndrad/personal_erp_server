import { TaskRepository } from '@app/core/repositories/tasks.repository';

describe(`${TaskRepository.name}`, () => {
  let repository: jest.Mocked<Partial<TaskRepository>>;

  it('Should be defined', () => {
    expect(repository).toBeDefined();
  });
});
