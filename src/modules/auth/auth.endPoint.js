import { roles } from "../../middleware/auth.js";

export const endPoint={
    create:[roles.Admin,roles.Designer],
    update:[roles.User,roles.Admin,roles.Designer],
    delete:[roles.User,roles.Admin,roles.Designer]
}