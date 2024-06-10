import jwt from "jsonwebtoken";
import errors from "../lib/error-codes.js";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null){
    return res.status(errors.NO_TOKEN.status).json({ error: errors.NO_TOKEN.message });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(errors.UNAUTHORIZED.status).json({ error: errors.UNAUTHORIZED.message});
    req.user = user;
    next();
  });
}
export default { authenticateToken }
