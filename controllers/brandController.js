import brandService from "../services/brandService.js";
import brandSchema from "../models/brandSchema.js";
import validate from "../lib/validate.js";
import successResponse from "../lib/successResponse.js";
import constant from "../constant/success-response.js"
import errors from "../lib/errors.js";
import generateRandomCode from "../lib/codeGenerator.js";
import {sendEmail, sendSMS} from "../lib/sendNotification.js"
import client from "../lib/redisClient.js";


// Redis-Implementation

// async function getAllBrandByUserId(req, res) {
//   const { page = 1, limit = 10, search = "" } = req.query;
//   let brand;
//   const brandInfo = await client.get(`BRAND_${req.user.id}`);
//   if (!brandInfo) {
//     brand = await brandService.getAllBrandByUserId(
//       req.user.id
//     );
//     await client.set(`BRAND_${req.user.id}`,JSON.stringify(brand));
//   } else {
//     brand = JSON.parse(brandInfo);
//   }
//   console.log("brand",brandInfo);
//     return successResponse(res, constant.BRAND_FETCHED, brand);
// }

async function getAllBrandByUserId(req, res) {
  const { page = 1, limit = 10, search = "",sortField="",sortOrder=""} = req.query;
    const records = await brandService.getAllBrandByUserId(
      req.user.id,
      page,
      limit,
      search,
      sortField,
      sortOrder
    );
    console.log("records",records);
    const [recordCount]= await brandService.getAllBrandCountByUserId(
      req.user.id,
      search
    );
    console.log("recordCount",recordCount);
    return successResponse(res, constant.BRAND_FETCHED, {
      total: recordCount.rowCount,
      records: records,
      pages: Math.ceil(recordCount.rowCount / limit),
    });
}

async function getBrandId(req, res) {
    const records = await brandService.getBrandId(req.params.id);
    if (!records || records.length === 0) {
      throw errors.BRAND_NOT_FOUND()
    }
    return successResponse(res, constant.BRAND_FETCHED, records);
}

async function createBrand(req, res) {
    validate(req.body, brandSchema);
    const records = await brandService.getAllBrandByName(req.user.id, req.body.name);
    console.log(records);
    if (!records || records.length !== 0) {
      throw errors.BRAND_ALREADY_EXIST()
    }
    const payload = {
      user_id: req.user.id,
      name:req.body.name,
      description: req.body.description,
      brandcode:generateRandomCode()
    }
    const record = await brandService.addBrand(payload);
   // sendNotification(req.user.id,constant.BRAND_CREATED)
    sendSMS('+917239866751',"Brand Created Successfully");
    sendEmail('ashwinmeena.30@gmail.com',"Brand Created Successfully");
    
    return successResponse(res, constant.BRAND_CREATED, record);

}

async function updateBrandRecordById(req, res) {
  console.log("===body",req.body,req.params.id);
    validate(req.body, brandSchema);
    const record = await brandService.updateBrandRecordById(req.params.id, req.body);
    return successResponse(res, constant.BRAND_UPDATED, record);
}

async function deleteBrandRecordByID(req, res) {
    await brandService.deleteBrandRecordByID(req.params.id);
    return successResponse(res, constant.BRAND_DELETED);
  
}

export default {createBrand,getAllBrandByUserId,updateBrandRecordById,deleteBrandRecordByID,getBrandId}