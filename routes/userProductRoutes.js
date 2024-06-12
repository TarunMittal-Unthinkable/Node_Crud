import express from 'express';
import userProductController from '../controllers/userProductController.js';
import asyncback from "asyncback";
import authenticateToken from "../middlewares/authMiddleware.js";
const router = express.Router();
const {
    getAllProductsForUser
} = userProductController;

router.get('/', authenticateToken, asyncback(getAllProductsForUser));

export default router;
