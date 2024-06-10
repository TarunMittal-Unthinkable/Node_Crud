import knex from '../knex.js';

// Retrieve records by user ID with pagination and optional search
async function getAllBrandByUserId(userId, page, limit, search) {
    const offset = (page - 1) * limit;
    return knex('brands') 
        .where('user_id', userId)
        .andWhere('is_active', true)
        .andWhere(function() {
            if (search) {
                this.where('name', 'like', `%${search}%`);
            }
        })
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset);
}

// Add a new brand record
async function addBrand(payload) {
    const [record] = await knex('brands') 
        .insert(payload)
        .returning('*');
    return record;
}

// Update an existing brand record
async function updateBrandRecordById(brandId, recordData) {
    const [updatedRecord] = await knex('brands') 
        .where('id', brandId)
        .update({
            ...recordData,
            updated_at: new Date()
        })
        .returning('*');
    return updatedRecord;
}

// Delete a brand record
async function deleteBrandRecordByID(brandId) {
    await knex('brands') 
        .where('id', brandId)
        .update({is_active:false});
}

export default {addBrand,getAllBrandByUserId,updateBrandRecordById,deleteBrandRecordByID}

