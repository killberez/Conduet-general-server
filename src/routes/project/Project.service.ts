import Project, { ProjectDocument } from "./Project.model";

function findAll(): Promise<ProjectDocument[]> {
  return Project.find().exec();
}

function findById(projectId: string): Promise<ProjectDocument> {
  return Project.findById(projectId)
    .exec()
    .then((project) => {
      if (!project) {
        throw new Error(`project ${projectId} not found`);
      }
      return project;
    });
}

function findAllByUserId(userId: string): any {
  const projects = Project.find({ userId: userId });
  return projects;
}

function create(project: ProjectDocument): Promise<ProjectDocument> {
  return project.save();
}

function update(
  projectId: string,
  update: Partial<ProjectDocument>
): Promise<ProjectDocument> {
  return Project.findById(projectId)
    .exec()
    .then((project) => {
      if (!project) {
        throw new Error(`project ${projectId} not found`);
      }
      if (update.settings) {
        project.settings = update.settings;
        project.lastModifiedOn = new Date();
      }
      if (update.name) {
        project.name = update.name;
        project.lastModifiedOn = new Date();
      }
      return project.save();
    });
}

function deleteProject(projectId: string): Promise<ProjectDocument | null> {
  return Project.findByIdAndDelete(projectId).exec();
}

export default {
  findAll,
  create,
  deleteProject,
  update,
  findById,
  findAllByUserId,
};
