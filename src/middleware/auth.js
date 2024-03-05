import userModel from "../../DB/model/User.model.js";
import { verifyToken } from "../utils/GenerateAndVerifyToken.js";
import { asyncHandler } from "../utils/errorHandling.js";
export const roles = {
  Admin: "Admin",
  User: "User",
  Designer: "Designer",
};
export const auth = (accessRoles = []) => {
  return asyncHandler(async (req, res, next) => {
		const {accessToken,refreshToken} = req.cookies;
	  console.log("access ="accessToken,refreshToken)
    if (!accessToken&&!refreshToken) {
      return next(new Error("please Login to continue", { cause: 400 }));
    }
    const decoded = verifyToken( {accessToken} );
    if (!decoded?.userId) {
      return next(new Error("In-valid token payload", { cause: 400 }));
    }
    const user = await userModel
      .findById(decoded.userId)
      .select("userName image role changePasswordTime");
    if (!user) {
      return next(new Error("Not register account", { cause: 401 }));
    }
    if (parseInt(user.changePasswordTime?.getTime() / 1000) > decoded.iat) {
      return next(new Error("expired token", { cause: 400 }));
    }

    if (!accessRoles.includes(user.role)) {
      return next(new Error("Not authorized user", { cause: 403 }));
    }
    req.user = decoded.userId;
    console.log(req.user)
    return next();
  });
};

export default auth;
