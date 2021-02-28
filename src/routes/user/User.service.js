"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("./User.model"));
function create(user) {
    return user.save();
}
function find(id) {
    return User_model_1.default.findById(id)
        .exec()
        .then((user) => {
        if (!user) {
            throw new Error(`User ${id} not found`);
        }
        return user;
    });
}
// async function findProject(projectId: string): Promise<UserProjectsDocument> {
//   const project = await UserProjects.findById(projectId).exec();
//   if (!project) {
//     throw new Error(`Project ${projectId} not found`);
// }
//   return project;
// }
exports.default = {
    create,
    find,
};
