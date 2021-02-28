import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../routes/user/User.model";

dotenv.config();

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    res.json("No access!");
  }
  const token = req.headers.authorization;
  if(!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_KEY as string, async (err, data: any) => {
    if (err) return res.sendStatus(403);
    const user = await User.findById(data.id).exec();
    if (!user) {
      throw new Error(`User ${data.id} not found`);
    }
    else {
      req.body.userId = data.id;
      req.body.user = user;
      next();
    }
  });
};