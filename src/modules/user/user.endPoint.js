import { roles } from "../../middleware/auth.js";

export const endPoint = {
  addUsers: [roles.Admin],
  update: [roles.User, roles.Admin, roles.Designer],
  delete: [roles.User, roles.Admin, roles.Designer],
};
