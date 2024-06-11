import express from 'express';
import reviewController from '../controllers/reviewController.js';
import asyncback from "asyncback";
import authenticateToken from "../middlewares/authMiddleware.js";
const router = express.Router();
const {
    createReview,
    updateReviewRecordById,
    deleteReviewRecordByID,
    getAllReviewsByCategoryId
} = reviewController;

router.get('/', authenticateToken, asyncback(getAllReviewsByCategoryId));
router.post('/', authenticateToken, asyncback(createReview));
router.put('/:id', authenticateToken, asyncback(updateReviewRecordById));
router.delete('/:id', authenticateToken, asyncback(deleteReviewRecordByID));

export default router;
