import userService from "../services/userService.js";
const { createUser, findUser, findExistingNumber,findUseById } = userService;
import validate from "../lib/validate.js";
import signUpSchema from "../models/sign-up.js";
import errors from "../lib/errors.js";
// import errorResponses from "../lib/errorResponse.js";
// const { errorResponse } = errorResponses;
import successResponses from "../lib/successResponse.js";
const { successResponse } = successResponses;
import bcrypt from "bcrypt";
import loginSchema from "../models/login.js";
import jwt from "jsonwebtoken";

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1d",
  });
}

async function register(req, res) {
  // // try {
  //   console.log("============")
  //   debugger;
    validate(req.body, signUpSchema);
    const { email, password, first_name, last_name, dob, phone_no, gender } =
      req.body;
    const existingUser = await findUser(email);
    if (existingUser) {
      throw errors.USER_EXISTS()
      //return errorResponse(res, errors.USER_EXISTS.status,errors.USER_EXISTS.message, errors.USER_EXISTS.code);
    }
    const existingPhoneNumber = await findExistingNumber(phone_no);
    if (existingPhoneNumber) {
      throw errors.MOBILE_EXIST()
       // return errorResponse(res, errors.MOBILE_EXIST.status,errors.MOBILE_EXIST.message, errors.MOBILE_EXIST.code);
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const fields = {
      email,
      password: hashedPassword,
      first_name,
      last_name,
      dob,
      phone_no,
      gender,
    };
    const newUser = await createUser(fields);
    return successResponse(res, errors.USER_REGISTERED.status,errors.USER_REGISTERED.message, errors.USER_REGISTERED.code,newUser);
  // } catch (error) {
  //   return errorResponse(res, errors.INTERNAL.status,error.message || errors.INTERNAL.message, errors.INTERNAL.code);
  // }
}

async function login(req, res, next) {
  // try {
    validate(req.body, loginSchema);
    const existingUser = await findUser(req.body.email);
    if (!existingUser) {
      throw errors.USER_EXISTS()
        //return errorResponse(res, errors.INVALID_USER_LOGIN.status,errors.INVALID_USER_LOGIN.message, errors.INVALID_USER_LOGIN.code);
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!isMatch) {
      throw errors.INVALID_USER_LOGIN()
        //return errorResponse(res, errors.INVALID_USER_LOGIN.status,errors.INVALID_USER_LOGIN.message, errors.INVALID_USER_LOGIN.code);

    }
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);
    res.set("Authorization", accessToken);
    res.set("RefreshToken", refreshToken);
    return successResponse(res, errors.LOGIN_SUCCESSFUL.status,errors.LOGIN_SUCCESSFUL.message, errors.LOGIN_SUCCESSFUL.code);

  // } catch (error) {
  //   return errorResponse(res, errors.INTERNAL.status,error.message || errors.INTERNAL.message, errors.INTERNAL.code);
  // }
}

async function refresh(req, res, next) {
  // try {
    const token = req.get("RefreshToken") || req.query["RefreshToken"];
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = { id: decoded.userId };
    const tokenUser = await findUseById(user.id);
    if (!tokenUser) {
      throw errors.INVALID_TOKEN()
      //return errorResponse(res, errors.INVALID_TOKEN.status,errors.INVALID_TOKEN.message, errors.INVALID_TOKEN.code);
  }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.set("Authorization", accessToken);
    res.set("RefreshToken", refreshToken);
    return successResponse(res, errors.TOKEN_GENERATED.status,errors.TOKEN_GENERATED.message, errors.TOKEN_GENERATED.code);

  // } catch (error) {
  //     return errorResponse(res, errors.INTERNAL.status,error.message || errors.INTERNAL.message, errors.INTERNAL.code);

  // }
}

export default { register, login, refresh };
