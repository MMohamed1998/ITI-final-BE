import { roles } from "../../middleware/auth.js";

export const endPoint = {
  addOffer: [roles.Designer],
  updateOffer: [roles.Designer],
  deleteOffer: [roles.Designer,roles.Admin],
  userOffer: [roles.Designer],
  projectOffer: [roles.Designer,roles.Admin,roles.User],
  oneOffer: [roles.Designer,roles.Admin,roles.User],
  allOffer: [roles.Admin],
};
