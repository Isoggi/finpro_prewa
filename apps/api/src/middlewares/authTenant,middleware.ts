import {users_role} from "@prisma/client"
import { ErrorHandler } from "../helpers/response.helper";
import { Request, Response, NextFunction } from "express";
export const AuthOrganizerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if(req.user?.user_role){
    if (users_role[req.user?.user_role] !== users_role.tenant) {
      throw new ErrorHandler("unauthorized", 401);
    }}
    next();
  } catch (error) {
    next(error);
  }
};