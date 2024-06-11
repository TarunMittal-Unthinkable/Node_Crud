import express from 'express';
import productController from '../controllers/productController.js';
import asyncback from "asyncback";
import authenticateToken from "../middlewares/authMiddleware.js";
const router = express.Router();
const {
    createProduct,
    updateProductRecordById,
    deleteProductRecordByID,
    getAllProductByBrandId
} = productController;


router.get('/', authenticateToken, asyncback(getAllProductByBrandId));
router.post("/", authenticateToken, asyncback(createProduct));
router.put("/:id", authenticateToken, asyncback(updateProductRecordById));
router.delete("/:id", authenticateToken, asyncback(deleteProductRecordByID));

export default router;
