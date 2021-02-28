"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Project_model_1 = __importDefault(require("./Project.model"));
function findAll() {
    return Project_model_1.default.find().exec();
}
function findById(projectId) {
    return Project_model_1.default.findById(projectId)
        .exec()
        .then((project) => {
        if (!project) {
            throw new Error(`project ${projectId} not found`);
        }
        return project;
    });
}
function findAllByUserId(userId) {
    const projects = Project_model_1.default.find({ userId: userId });
    return projects;
}
function create(project) {
    return project.save();
}
function update(projectId, update) {
    return Project_model_1.default.findById(projectId)
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
function deleteProject(projectId) {
    return Project_model_1.default.findByIdAndDelete(projectId).exec();
}
exports.default = {
    findAll,
    create,
    deleteProject,
    update,
    findById,
    findAllByUserId,
};
