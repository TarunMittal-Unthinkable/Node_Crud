import knex from '../knex.js';


async function getAllProductByBrandId(brandId, page, limit, search) {
    const offset = (page - 1) * limit;
    return knex('products').
        leftJoin('brands', 'products.brand_id', 'brands.id') 
        .where('brand_id', brandId)
        .andWhere('products.is_active', true)
        .andWhere(function() {
            if (search) {
                this.where('products.name', 'like', `%${search}%`).orWhere('brands.name', 'ilike', `%${search}%`);
            }
        }).
         select('products.*', 'brands.name as brand_name')
        .orderBy('created_at', 'desc')
        .limit(limit)
        .offset(offset);
}
async function getAllProductCount(brandId, search) {
    return knex('products')
        .count('* as rowCount') 
        .where('brand_id', brandId)
        .andWhere('is_active', true)
        .andWhere(function() {
            if (search) {
                this.where('name', 'like', `%${search}%`);
            }
        });
}

async function getProductByBrandId(brandId) {
    return knex('products') 
        .where('brand_id', brandId)
        .andWhere('is_active', true);
}

async function getProductByName(name, brand_id) {
    return knex('products') 
        .where('brand_id', brand_id)
        .andWhere('is_active', true)
        .andWhere('name', name);
}


// Add a new Product record
async function createProduct(payload) {
    return await knex('products') 
        .insert(payload)
        .returning('*');

}

// Update an existing Product record
async function updateProductRecordById(productId, recordData) {
    return await knex('products') 
        .where('id', productId)
        .andWhere('is_active', true)
        .update({
            ...recordData,
            updated_at: new Date()
        })
        .returning('*');
}

// Delete a Product record
async function deleteProductRecordByID(productId) {
    await knex('products') 
        .where('id', productId)
        .update({is_active:false});
}

export default {createProduct,getAllProductByBrandId,updateProductRecordById,deleteProductRecordByID,getProductByName,getProductByBrandId,getAllProductCount}

