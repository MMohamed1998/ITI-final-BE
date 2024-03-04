import { roles } from "../../middleware/auth.js";

export const endPoint = {
  addOffer: [roles.Designer],
  updateOffer: [roles.Designer],
  deleteOffer: [roles.Designer],
  userOffer: [roles.Designer],
  userOffer: [roles.Designer],
};
