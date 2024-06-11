import express from 'express';
import categoryController from '../controllers/categoryController.js';
import asyncback from "asyncback";
import authenticateToken from "../middlewares/authMiddleware.js";
const router = express.Router();
const {
    createCategory,
    updateCategoryRecordById,
    deleteCategoryRecordByID,
    getAllCategoryByProductId
} = categoryController;

router.get('/', authenticateToken,asyncback(getAllCategoryByProductId));
router.post('/', authenticateToken, asyncback(createCategory));
router.put('/:id', authenticateToken, asyncback(updateCategoryRecordById));
router.delete('/:id', authenticateToken, asyncback(deleteCategoryRecordByID));

export default router;
