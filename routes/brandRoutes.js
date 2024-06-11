import express from 'express';
import brandController from '../controllers/brandController.js';
import asyncback from "asyncback"
const {
    createBrand,
    getAllBrandByUserId,
    updateBrandRecordById,
    deleteBrandRecordByID,
    getBrandId
} = brandController;
import authenticateToken from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/", authenticateToken, asyncback(getAllBrandByUserId));
router.get('/:id', authenticateToken, asyncback(getBrandId));
router.post("/", authenticateToken, asyncback(createBrand));
router.put("/:id", authenticateToken, asyncback(updateBrandRecordById));
router.delete("/:id", authenticateToken, asyncback(deleteBrandRecordByID));

export default router;
