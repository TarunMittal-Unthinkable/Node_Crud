import brandService from "../services/brandService.js";
import brandSchema from "../models/brandSchema.js";
import validate from "../lib/validate.js";
import successResponse from "../lib/successResponse.js";
import constant from "../constant/success-response.js"
import errors from "../lib/errors.js";

async function getAllBrandByUserId(req, res) {
  const { page = 1, limit = 10, search = "" } = req.query;
    const records = await brandService.getAllBrandByUserId(
      req.user.id,
      page,
      limit,
      search
    );
    return successResponse(res, constant.BRAND_FETCHED, records);
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
      description: req.body.description
    }
    const record = await brandService.addBrand(payload);
    return successResponse(res, constant.BRAND_CREATED, record);

}

async function updateBrandRecordById(req, res) {
    validate(req.body, brandSchema);
    const record = await brandService.updateBrandRecordById(req.params.id, req.body);
    return successResponse(res, constant.BRAND_UPDATED, record);
}

async function deleteBrandRecordByID(req, res) {
    await brandService.deleteBrandRecordByID(req.params.id);
    return successResponse(res, constant.BRAND_DELETED);
  
}

export default {createBrand,getAllBrandByUserId,updateBrandRecordById,deleteBrandRecordByID,getBrandId}