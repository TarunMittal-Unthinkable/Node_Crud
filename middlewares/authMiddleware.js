import jwt from "jsonwebtoken";
import errors from "../lib/errors.js";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token == null){
    throw errors.NO_TOKEN()
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw errors.UNAUTHORIZED()
    }
    req.user = {id:user.userId};
    console.log("====user",req.user);
    next();
  });
}
export default authenticateToken
