import { z } from 'zod';

export class UserSchemaValidator {
  private validateSchemaId = z.string().length(24);

  createUserValidate() {}
}
