import express from 'express';
import userController from '../controllers/userController.js';
import asyncback from "asyncback"

const { register, login, refresh } = userController;
const router = express.Router();

router.post('/register', asyncback(register));
router.post('/login', asyncback(login));
router.post('/refresh', asyncback(refresh));

export default router;
