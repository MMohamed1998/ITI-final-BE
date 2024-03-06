import jwt, { decode } from "jsonwebtoken";

export const generateToken = ({
  payload = {},
  signature = process.env.TOKEN_SIGNATURE,
  expiresIn = 60 * 60,
} = {}) => {
  const token = jwt.sign(payload, signature, {
    expiresIn: parseInt(expiresIn),
  });
  return token;
};
export const generateTokenAndSetCookie = (userId, res) => {
  const accessToken = jwt.sign({ userId }, process.env.TOKEN_SIGNATURE, {
    expiresIn:"1m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.TOKEN_SIGNATURE, {
    expiresIn: "1y",
  });

  res.cookie("accessToken", accessToken, {
    maxAge: 60 * 1000, // MS
    // httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "null", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "DEV",
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 365 * 24 * 60 * 60 * 1000, // MS
    // httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "null", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "DEV",
  });
  return  {accessToken, refreshToken} ;
};

export const verifyToken = ({
  accessToken,
  signature = process.env.TOKEN_SIGNATURE,
} = {}) => {
  const decoded = jwt.verify(accessToken, signature);
  
  return decoded;
};





// export const renewToken = (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   let exist = false;
//   if(!refreshToken) {
//       return res.json({valid: false, message: "No Refresh token"})
//   } else {
//       jwt.verify(refreshToken, process.env.TOKEN_SIGNATURE, (err ,decoded) => {
//           if(err) {
//               return res.json({valid: false, message: "Invalid Refresh Token"})
//           } else {
//               const accessToken = jwt.sign({ userId: decoded.userId }, 
//                 process.env.TOKEN_SIGNATURE, {expiresIn: '0.5m'})
//                   res.cookie("accessToken", accessToken, {
//                     maxAge: 30 * 60 * 1000, // MS
//                     httpOnly: true, // prevent XSS attacks cross-site scripting attacks
//                     sameSite: "strict", // CSRF attacks cross-site request forgery attacks
//                     secure: process.env.NODE_ENV !== "DEV",
//                   });
//               exist = true;
//           }
//       })
//   }
//   return exist;
// }
