import knex from '../knex.js';


async function getUserById(userId) {
    return knex('users').select('id').where('id', userId).first();
  }
  
  async function getBrandsByUserId(userId) {
    return knex('brands').where('user_id', userId).andWhere('is_active', true);
  }
  
  async function getProductsByBrandId(brandId, search = "", limit, page) {
    const offset = (page - 1) * limit;
    return knex('products')
      .where('brand_id', brandId)
      .andWhere('is_active', true)
      .andWhere(builder => {
        if (search) {
          builder.where('name', 'like', `%${search}%`);
        }
      })
      .limit(limit)
      .offset(offset);
  }
  
  async function getCategoriesByProductId(productId) {
    return knex('categories')
      .where('product_id', productId)
      .andWhere('is_active', true);
  }
  
  async function getReviewsByCategoryId(categoryId) {
    return knex('reviews')
      .where('category_id', categoryId)
      .andWhere('is_active', true);
  }
  
  export default {getReviewsByCategoryId, getCategoriesByProductId,getProductsByBrandId, getBrandsByUserId, getUserById }
