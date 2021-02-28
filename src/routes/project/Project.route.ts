import express from "express";
import {
  findAll,
  createProject,
  deleteProject,
  updateProject,
  findById,
} from "./Project.controller";

const router = express.Router();

router.get("/", findAll);
router.post("/", createProject);
router.delete("/:projectId", deleteProject);
router.patch("/:projectId", updateProject);
router.get("/:projectId", findById);

export default router;
