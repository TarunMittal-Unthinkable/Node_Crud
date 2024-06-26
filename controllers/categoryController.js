import categoryService from "../services/categoryService.js";
import categorySchema from "../models/categorySchema.js";
import validate from "../lib/validate.js";
import successResponse from "../lib/successResponse.js";
import constant from "../constant/success-response.js"
import errors from "../lib/errors.js";
import generateRandomCode from "../lib/codeGenerator.js";
import {sendEmail, sendSMS} from "../lib/sendNotification.js"
import client from "../lib/redisClient.js";

    // Redis-Implementation

// async function getAllCategoryByProductId(req, res) {
//   const { page = 1, limit = 10, search = "",productId } = req.query;
//   let category;
//   const categoryInfo = await client.get(`CATEGORY_${productId}`);
//   if (!categoryInfo) {
//     category = await productService.getCategoryByProductId(brandId);
//   if (!category || category.length === 0) {
//     throw errors.CATEGORY_NOT_FOUND()
// }
//     await client.set(`CATEGORY_${productId}`,JSON.stringify(category));
//   } else {
//     category = JSON.parse(categoryInfo);
//   }
//     return successResponse(res, constant.CATEGORY_FETCHED, category);
// }
    
    async function getAllCategoryByProductId(req, res) {
        const { page = 1, limit = 10, search = "",productId } = req.query;
        // const record = await categoryService.getCategoryByProductId(productId);
        // if (!record || record.length === 0) {
        //     throw errors.CATEGORY_NOT_FOUND()
        // }
        const records = await categoryService.getAllCategoryByProductId(
          productId,
          page,
          limit,
          search
        );
        const [recordCount]= await categoryService.getAllCategoryCount(
            productId,
            search
          );
          console.log("recordCount",recordCount);
          return successResponse(res, constant.CATEGORY_FETCHED, {
            total: recordCount.rowCount,
            records: records,
            pages: Math.ceil(recordCount.rowCount / limit),
          });
       // return successResponse(res, constant.CATEGORY_FETCHED, records);
    };
    
    async function createCategory(req, res) {
        validate(req.body, categorySchema);
        console.log("req.body",req.body.name,req.body.productId);
        const records = await categoryService.getCategoryByName(req.body.name,req.body.productId);
        if (!records || records.length !== 0) {
            throw errors.CATEGORY_ALREADY_EXIST()
        }
        const payload = {
          product_id: req.body.productId,
          name:req.body.name,
          description: req.body.description,
          colors:req.body.colors,
          totalQty:req.body.totalQty,
          totalSold:req.body.totalSold,
          sizes:req.body.sizes,
          priceperquantity:req.body.priceperquantity,
          categorycode:generateRandomCode()
        }
        console.log("req.body",payload);
        const categoryRecord = await categoryService.createCategory(payload);
        return successResponse(res, constant.CATEGORY_CREATED, categoryRecord);
    };
    
    async function updateCategoryRecordById(req, res) {
            validate(req.body, categorySchema);
            const record = await categoryService.updateCategoryRecordById(req.params.id, req.body);
            return successResponse(res, constant.CATEGORY_UPDATED, record);
    };
    
    async function deleteCategoryRecordByID(req, res) {
            const record = await categoryService.deleteCategoryRecordByID(req.params.id);
            return successResponse(res, constant.CATEGORY_DELETED, record);
    };
    
    export default {getAllCategoryByProductId,createCategory,updateCategoryRecordById,deleteCategoryRecordByID}
