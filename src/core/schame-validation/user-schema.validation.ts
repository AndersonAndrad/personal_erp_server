import { z } from 'zod';
import { CreateUser } from '../interfaces/user.interface';

export class UserSchemaValidator {
  private validateSchemaId = z.string().length(24);

  createUserValidate(userSchema: CreateUser): void {
    try {
      const createSchema = z.object({
        name: z.string().min(3).max(250),
        nickName: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(8).max(250),
        confirmPassword: z.string().min(8).max(250),
        blocked: z.boolean(),
      });
      // .refine((data) => {
      //   if (data.password !== data.confirmPassword) {
      //     throw new Error('The passwords do not match');
      //   }
      // });

      createSchema.parse(userSchema);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          throw new Error(`Validation error at path ${issue.path.join('.')} - ${issue.message}`);
        });
      } else {
        throw 'Validation error:';
      }
    }
  }
}
