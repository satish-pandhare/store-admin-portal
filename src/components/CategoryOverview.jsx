import React, { useState, useEffect } from "react";
import { Package, List, ChevronRight, ArrowLeft } from "lucide-react";
import api from "../utils/api";

const CategoryOverview = ({
  onSelectCategory,
  onNavigateToInventory,
  onBack,
}) => {
  const [categories, setCategories] = useState([]);
  const [categoryImages, setCategoryImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await api.getCategories();
      setCategories(data);

      const images = {};
      await Promise.all(
        data.map(async (cat) => {
          try {
            const catData = await api.getProductsByCategory(cat.slug, 1);
            if (catData.products[0]) {
              images[cat.slug] = catData.products[0].thumbnail;
            }
          } catch (error) {
            console.error(`Error fetching image for ${cat.slug}:`, error);
          }
        })
      );
      setCategoryImages(images);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Category Catalog
                </h1>
                {/* <p className="text-gray-600 mt-2">
                  Browse products by category
                </p> */}
              </div>
            </div>
            <button
              onClick={onNavigateToInventory}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
            >
              <List className="w-5 h-5" />
              View All Products
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => onSelectCategory(category.slug)}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 text-left group"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  {categoryImages[category.slug] ? (
                    <img
                      src={categoryImages[category.slug]}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <Package className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 capitalize group-hover:text-emerald-600 transition-colors">
                  {category.name}
                </h3>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                  <span>View products</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryOverview;
