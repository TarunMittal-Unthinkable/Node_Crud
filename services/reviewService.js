import knex from '../knex.js';


async function getAllReviewsByCategoryId(categoryId, page, limit, search) {
    const offset = (page - 1) * limit;
    return knex('reviews') 
        .where('category_id', categoryId)
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


async function getCategoryByProductId(categoryId) {
    return knex('reviews') 
        .where('category_id', categoryId)
        .andWhere('is_active', true);
}

async function getCategoryByName(name, categoryId) {
    return knex('reviews') 
        .where('category_id', categoryId)
        .andWhere('is_active', true)
        .andWhere('name', name);
}


// Add a new Review record
async function createReview(payload) {
    return await knex('reviews') 
        .insert(payload)
        .returning('*');

}

// Update an existing Review record
async function updateReviewRecordById(reviewId, recordData) {
    return await knex('reviews') 
        .where('id', reviewId)
        .andWhere('is_active', true)
        .update({
            ...recordData,
            updated_at: new Date()
        })
        .returning('*');
}

// Delete a Review record
async function deleteReviewRecordByID(reviewId) {
    await knex('reviews') 
        .where('id', reviewId)
        .update({is_active:false});
}

export default {createReview,getAllReviewsByCategoryId,updateReviewRecordById,deleteReviewRecordByID,getCategoryByName,getCategoryByProductId}

