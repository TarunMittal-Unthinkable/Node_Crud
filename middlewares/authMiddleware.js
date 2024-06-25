import jwt from "jsonwebtoken";
import errors from "../lib/errors.js";
import client from "../lib/redisClient.js";
import userService from "../services/userService.js"

async function getUser(decodedToken) {
  console.log("User");
  let user;
  console.log('======', decodedToken);
  
  const userInfo = await client.get(decodedToken.userId.toString());
  console.log("Useruser[0]", userInfo);
  

  if (!userInfo) {
    user = await userService.findUseById(decodedToken.userId);
    console.log("User===", user);

    await client.set(decodedToken.userId.toString(), JSON.stringify({
      id: user.id,
      email: user.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
      phone_no: user?.phone_no,
      gender: user?.gender,
    }));
    console.log("User333===", user);
  } else {
    user = JSON.parse(userInfo);
  }
  console.log("User111===", user);
  return user;
}

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader;

    if (token == null) {
      return next(errors.NO_TOKEN());
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return next(errors.UNAUTHORIZED());
      }

      try {
        const user = await getUser(decodedToken);
        req.user = user;
        next();
      } catch (err) {
        next(err); 
      }
    });
  } catch (err) {
    next(err);
  }
}

export default authenticateToken;