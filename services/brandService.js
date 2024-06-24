import knex from '../knex.js';

// Retrieve records by user ID with pagination and optional search
async function getAllBrandByUserId(userId, page, limit, search) {
    const offset = (page - 1) * limit;
    return knex('brands') 
        .where('user_id', userId)
        .andWhere('is_active', true)
        .andWhere(function() {
            if (search) {
                this.where('name', 'ilike', `%${search}%`).orWhere('brandcode', 'ilike', `%${search}%`);
            }
        })
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset);
}
async function getAllBrandCountByUserId(userId, search) {
    return knex('brands')
        .count('* as rowCount') 
        .where('user_id', userId)
        .andWhere('is_active', true)
        .andWhere(function() {
            if (search) {
                this.where('name', 'like', `%${search}%`);
            }
        });
}

async function getAllBrandByName(userId, name) {
    return knex('brands') 
        .where('user_id', userId)
        .andWhere('is_active', true)
        .andWhere('name', name);
}


// Get Brand By ID
async function getBrandId(brandId) {
    return knex('brands') 
        .where('id', brandId)
        .andWhere('is_active', true)
}

// Add a new brand record
async function addBrand(payload) {
    return await knex('brands') 
        .insert(payload)
        .returning('*');

}

// Update an existing brand record
async function updateBrandRecordById(brandId, recordData) {
    console.log("brandId",brandId);
    const {name, description}=recordData
    return await knex('brands') 
        .where('id', brandId)
        .andWhere('is_active', true)
        .update({
            name:name,
            description:description,
            updated_at: new Date()
        })
        .returning('*');
}

// Delete a brand record
async function deleteBrandRecordByID(brandId) {
    await knex('brands') 
        .where('id', brandId)
        .update({is_active:false});
}

export default {addBrand,getAllBrandByUserId,updateBrandRecordById,deleteBrandRecordByID,getBrandId,getAllBrandByName,getAllBrandCountByUserId}

