import express from "express";
import { getUser } from "./User.controller";

const router = express.Router();

router.get("/", getUser);
export default router;
