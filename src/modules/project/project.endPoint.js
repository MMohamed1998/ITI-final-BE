import { roles } from "../../middleware/auth.js";

export const endPoint = {
  addProject: [roles.User],
  updateProject: [roles.User],
  deleteProject: [roles.User,roles.Admin],
  userProject: [roles.User],
};
