import { ErrorHandler } from '../helpers/response.helper';
import {
  loginSchema,
  registerSchema,
  verifyForgetPasswordSchema,
} from '../schemas/auth.schema';
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validateAuth =
  (schema: z.infer<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema == registerSchema) {
      } else if (schema == loginSchema) {
      } else if ((schema = verifyForgetPasswordSchema)) {
      }
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors
          .map((issue: any) => issue.message)
          .join(', ');

        next(new ErrorHandler(message, 400));
      }
    }
  };
