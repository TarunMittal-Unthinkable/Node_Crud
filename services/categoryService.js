import knex from '../knex.js';


async function getAllCategoryByProductId(productId, page, limit, search) {
    const offset = (page - 1) * limit;
    return knex('categories') 
        .where('product_id', productId)
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


async function getCategoryByProductId(productId) {
    return knex('categories') 
        .where('product_id', productId)
        .andWhere('is_active', true);
}

async function getCategoryByName(name, productId) {
    return knex('categories') 
        .where('product_id', productId)
        .andWhere('is_active', true)
        .andWhere('name', name);
}


// Add a new Category record
async function createCategory(payload) {
    return await knex('categories') 
        .insert(payload)
        .returning('*');

}

// Update an existing Category record
async function updateCategoryRecordById(categoryId, recordData) {
    return await knex('categories') 
        .where('id', categoryId)
        .andWhere('is_active', true)
        .update({
            ...recordData,
            updated_at: new Date()
        })
        .returning('*');
}

// Delete a Category record
async function deleteCategoryRecordByID(categoryId) {
    await knex('categories') 
        .where('id', categoryId)
        .update({is_active:false});
}

export default {createCategory,getAllCategoryByProductId,updateCategoryRecordById,deleteCategoryRecordByID,getCategoryByName,getCategoryByProductId}

