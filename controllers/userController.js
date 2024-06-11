import userService from "../services/userService.js";
const { createUser, findUser, findExistingNumber,findUseById } = userService;
import validate from "../lib/validate.js";
import signUpSchema from "../models/sign-up.js";
import errors from "../lib/errors.js";
import successResponse from "../lib/successResponse.js";
import bcrypt from "bcrypt";
import loginSchema from "../models/login.js";
import jwt from "jsonwebtoken";
import constant from "../constant/success-response.js"

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "25m",
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "1d",
  });
}

async function register(req, res) {
    validate(req.body, signUpSchema);
    const { email, password, first_name, last_name, dob, phone_no, gender } =
      req.body;
    const existingUser = await findUser(email);
    if (existingUser) {
      throw errors.USER_EXISTS()
    }
    const existingPhoneNumber = await findExistingNumber(phone_no);
    if (existingPhoneNumber) {
      throw errors.MOBILE_EXIST()
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
    return successResponse(res, constant.USER_CREATED,newUser);

}

async function login(req, res, next) {
    validate(req.body, loginSchema);
    const existingUser = await findUser(req.body.email);
    if (!existingUser) {
      throw errors.USER_EXISTS()
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!isMatch) {
      throw errors.INVALID_USER_LOGIN()
    }
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);
    res.set("Authorization", accessToken);
    res.set("RefreshToken", refreshToken);
    return successResponse(res, constant.LOGIN_SUCCESSFUL);
}

async function refresh(req, res, next) {
    const token = req.get("RefreshToken") || req.query["RefreshToken"];
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = { id: decoded.userId };
    const tokenUser = await findUseById(user.id);
    if (!tokenUser) {
      throw errors.INVALID_TOKEN()
  }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.set("Authorization", accessToken);
    res.set("RefreshToken", refreshToken);
    return successResponse(res, constant.TOKEN_GENERATED);
}

export default { register, login, refresh };
