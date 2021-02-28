import UserProjects, {
  UserProjectsDocument,
} from "../userProjects/UserProjects.model";
import User, { UserDocument } from "./User.model";

function create(user: UserDocument): Promise<UserDocument> {
  return user.save();
}

function find(id: string): Promise<UserDocument> {
  return User.findById(id)
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

export default {
  create,
  find,
};
