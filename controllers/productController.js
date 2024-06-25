import productService from "../services/productService.js";
import productSchema from "../models/productSchema.js";
import validate from "../lib/validate.js";
import successResponse from "../lib/successResponse.js";
import constant from "../constant/success-response.js"
import errors from "../lib/errors.js";
import generateRandomCode from "../lib/codeGenerator.js";
import client from "../lib/redisClient.js";

// Redis-Implementation

// async function getAllProductByBrandId(req, res) {
//   const { page = 1, limit = 10, search = "",brandId } = req.query;
//   let product;
//   const productInfo = await client.get(`PRODUCT_${brandId}`);
//   if (!productInfo) {
//     product = await productService.getProductByBrandId(brandId);
//    if (!product || product.length === 0) {
//      throw errors.PRODUCT_NOT_FOUND()
//    }
//     await client.set(`PRODUCT_${brandId}`,JSON.stringify(product));
//   } else {
//     product = JSON.parse(productInfo);
//   }
//     return successResponse(res, constant.PRODUCT_FETCHED, product);
// }

async function getAllProductByBrandId(req, res) {
    const { page = 1, limit = 10, search = "",brandId } = req.query;
    const record = await productService.getProductByBrandId(brandId);
    if (!record || record.length === 0) {
        throw errors.PRODUCT_NOT_FOUND()
    }
    const records = await productService.getAllProductByBrandId(
      brandId,
      page,
      limit,
      search
    );
    console.log("records",records);
    const [recordCount]= await productService.getAllProductCount(
      brandId,
      search
    );
    console.log("recordCount",recordCount);
    return successResponse(res, constant.PRODUCT_FETCHED, {
      total: recordCount.rowCount,
      records: records,
      page,
      pages: Math.ceil(recordCount.rowCount / limit),
    });
};

async function createProduct(req, res) {
    validate(req.body, productSchema);
    const records = await productService.getProductByName(req.body.name,req.body.brandId);
    if (!records || records.length !== 0) {
        throw errors.PRODUCT_ALREADY_EXIST()
    }
    const payload = {
      brand_id: req.body.brandId,
      name:req.body.name,
      description: req.body.description,
      productcode:generateRandomCode()
    }
    const productRecord = await productService.createProduct(payload);
    return successResponse(res, constant.PRODUCT_CREATED, productRecord);
};

async function updateProductRecordById(req, res) {
        validate(req.body, productSchema);
        const record = await productService.updateProductRecordById(req.params.id, req.body);
        return successResponse(res, constant.PRODUCT_UPDATED, record);
};

async function deleteProductRecordByID(req, res) {
        const record = await productService.deleteProductRecordByID(req.params.id);
        return successResponse(res, constant.PRODUCT_DELETED, record);
};

export default {createProduct,getAllProductByBrandId,updateProductRecordById,deleteProductRecordByID}