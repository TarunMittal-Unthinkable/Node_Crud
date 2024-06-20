import express from 'express';
import userController from '../controllers/userController.js';
import asyncback from "asyncback"
import {apiRequestLimiter, apiLimiter} from '../middlewares/rateLimiting.js'
const { register, login, refresh } = userController;
const router = express.Router();

router.post('/register', apiLimiter, asyncback(register));
router.post('/login', apiRequestLimiter,asyncback(login));
router.post('/refresh', asyncback(refresh));

export default router;
