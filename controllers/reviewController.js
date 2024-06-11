import reviewService from "../services/reviewService.js";
import reviewSchema from "../models/reviewSchema.js";
import validate from "../lib/validate.js";
import successResponse from "../lib/successResponse.js";
import constant from "../constant/success-response.js"
import errors from "../lib/errors.js";
    
    async function getAllReviewsByCategoryId(req, res) {
        const { page = 1, limit = 10, search = "",categoryId } = req.query;
        const record = await reviewService.getCategoryByProductId(categoryId);
        if (!record || record.length === 0) {
            throw errors.REVIEW_NOT_FOUND()
        }
        const records = await reviewService.getAllReviewsByCategoryId(
          categoryId,
          page,
          limit,
          search
        );
        return successResponse(res, constant.REVIEW_FETCHED, records);
    };
    
    async function createReview(req, res) {
        validate(req.body, reviewSchema);
        const payload = {
          rating: req.body.rating,
          message:req.body.message,
          category_id:req.body.categoryId,
        }
        const reviewRecord = await reviewService.createReview(payload);
        return successResponse(res, constant.REVIEW_CREATED, reviewRecord);
    };
    
    async function updateReviewRecordById(req, res) {
            validate(req.body, reviewSchema);
            const record = await reviewService.updateReviewRecordById(req.params.id, req.body);
            return successResponse(res, constant.REVIEW_UPDATED, record);
    };
    
    async function deleteReviewRecordByID(req, res) {
            const record = await reviewService.deleteReviewRecordByID(req.params.id);
            return successResponse(res, constant.REVIEW_DELETED, record);
    };
    
    export default {getAllReviewsByCategoryId,createReview,updateReviewRecordById,deleteReviewRecordByID}
