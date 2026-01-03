const API_BASE = 'https://dummyjson.com';

export const api = {
  // Get all products with pagination
  getAllProducts: async (limit = 20, skip = 0) => {
    const response = await fetch(`${API_BASE}/products?limit=${limit}&skip=${skip}`);
    return response.json();
  },

  // Search products
  searchProducts: async (query, limit = 20, skip = 0) => {
    const response = await fetch(`${API_BASE}/products/search?q=${query}&limit=${limit}&skip=${skip}`);
    return response.json();
  },

  // Get single product
  getProduct: async (id) => {
    const response = await fetch(`${API_BASE}/products/${id}`);
    return response.json();
  },

  // Get all categories
  getCategories: async () => {
    const response = await fetch(`${API_BASE}/products/categories`);
    return response.json();
  },

  // Get products by category
  getProductsByCategory: async (category, limit = 20, skip = 0) => {
    const response = await fetch(`${API_BASE}/products/category/${category}?limit=${limit}&skip=${skip}`);
    return response.json();
  },
};

export default api;