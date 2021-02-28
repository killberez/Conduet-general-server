import { Request, Response, NextFunction } from "express";
import ProjectService from "./Project.service";
import Project from "./Project.model";

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projects = await ProjectService.findAllByUserId(req.body.userId);
    res.json(projects);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await ProjectService.findById(req.params.projectId);
    if (req.body.userId === project.userId) {
      res.json(project);
    } else {
      res.status(401).json("No access!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const findAllByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ProjectService.findAll());
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, settings } = req.body;
    const project = new Project({
      name: name,
      userId: req.body.userId,
      settings: settings,
      lastModifiedOn: new Date(),
    });
    const newProject = await ProjectService.create(project);
    res.json(newProject);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body;
    const projectId = req.params.projectId;
    const project = await ProjectService.findById(projectId);
    if (req.body.userId === project.userId) {
      const updateProject = await ProjectService.update(projectId, update);
      res.json(updateProject);
    } else {
      res.status(401).json("No access!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectId = req.params.projectId;
    const project = await ProjectService.findById(projectId);
    if (req.body.userId === project.userId) {
      await ProjectService.deleteProject(projectId);
      res.status(204).end();
    } else {
      res.json("No access!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
