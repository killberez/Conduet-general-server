import { Request, Response, NextFunction } from "express";
import User from "./User.model";
import userService from "./User.service";
import * as dotenv from "dotenv";

dotenv.config();

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(req.body.user);
  } catch (err) {
    res.status(500).json(err);
  }
};
