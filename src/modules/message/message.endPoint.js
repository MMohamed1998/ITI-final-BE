import { roles } from "../../middleware/auth.js";

export const endPoint={
    message:[roles.User,roles.Designer]
}