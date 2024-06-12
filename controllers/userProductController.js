import userProductService from "../services/userProductService.js";
import successResponse from "../lib/successResponse.js";
import constant from "../constant/success-response.js"

async function getAllProductsForUser(req, res) {
    const { page = 1, limit = 10, search = ""} = req.query;
      
      const user = await userProductService.getUserById(req.user.id);
      // Get Brands associated to User
      const brands = await userProductService.getBrandsByUserId(req.user.id);

      // Fetching Data from product, category and Review associated to brands 
      const brandsWithProducts = await Promise.all(brands.map(async (brand) => {

        // Get product associated to brand
        const products = await userProductService.getProductsByBrandId(brand.id, search, limit, page);
         
        const productsWithCategories = await Promise.all(products.map(async (product) => {

          // Get Category associated to products
          const categories = await userProductService.getCategoriesByProductId(product.id);
  
          const categoriesWithReviews = await Promise.all(categories.map(async (category) => {
            
            // Get Category associated to products
            const reviews = await userProductService.getReviewsByCategoryId(category.id);
            category.reviews = reviews;
            return category;
          }));
  
          product.categories = categoriesWithReviews;
          return product;
        }));
  
        brand.products = productsWithCategories;
        return brand;
      }));
  
      user.brands = brandsWithProducts;
      return successResponse(res, constant.USER_PRODUCT_RECORD_FECTHED_SUCCESSFULLY, user);
  }

export default {getAllProductsForUser}