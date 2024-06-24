import brandService from "../services/brandService.js";
import brandSchema from "../models/brandSchema.js";
import validate from "../lib/validate.js";
import successResponse from "../lib/successResponse.js";
import constant from "../constant/success-response.js"
import errors from "../lib/errors.js";
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
function generateRandomCode() {
  // Function to generate a random alphabet character
  function getRandomAlphabet() {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabets.charAt(Math.floor(Math.random() * alphabets.length));
  }

  // Function to generate a random integer between 0 and 9
  function getRandomNumber() {
    return Math.floor(Math.random() * 10);
  }
  // Generate two random alphabet characters
  let randomChars = getRandomAlphabet() + getRandomAlphabet();

  // Generate five random numbers
  let randomNumbers = '';
  for (let i = 0; i < 5; i++) {
    randomNumbers += getRandomNumber();
  }

  return randomChars + randomNumbers;
}



async function getAllBrandByUserId(req, res) {
  const { page = 1, limit = 10, search = "" } = req.query;
    const records = await brandService.getAllBrandByUserId(
      req.user.id,
      page,
      limit,
      search
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
      page,
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