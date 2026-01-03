import React, { useState, useEffect, useMemo } from "react";
import { Search, ArrowLeft, Star, Menu } from "lucide-react";
import api from "../utils/api";
import { getStockStatus } from "../utils/helpers";
import { useDebounce } from "../hooks/useDebounce";
import ProductSkeleton from "./ProductSkeleton";

const InventoryOverview = ({
  onSelectProduct,
  categoryFilter = null,
  onBack,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFilter || ""
  );
  const [categories, setCategories] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);
  const limit = 20;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, selectedCategory, skip]);

  const fetchCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let data;
      if (debouncedSearch) {
        data = await api.searchProducts(debouncedSearch, limit, skip);
      } else if (selectedCategory) {
        data = await api.getProductsByCategory(selectedCategory, limit, skip);
      } else {
        data = await api.getAllProducts(limit, skip);
      }

      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sortBy === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "stock") {
      sorted.sort((a, b) => b.stock - a.stack);
    }
    return sorted;
  }, [products, sortBy]);

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  // Calculate which page numbers to display
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-2 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-2xl font-bold text-gray-900">
                {categoryFilter
                  ? `${categoryFilter} Products`
                  : "Inventory Overview"}
              </h1>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className={`${showFilters ? "block" : "hidden md:block"}`}>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSkip(0);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSkip(0);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="stock">Stock Level</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4 text-sm text-gray-600">
          Showing {skip + 1}-{Math.min(skip + limit, total)} of {total} products
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <button
                    key={product.id}
                    onClick={() => onSelectProduct(product.id)}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 text-left group"
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-600">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-500">
                        {product.brand}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-sm text-gray-500 capitalize">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${stockStatus.color}`}
                      >
                        {stockStatus.label}
                      </span>
                      <span className="text-sm text-gray-600">
                        {product.stock} units
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => setSkip(Math.max(0, skip - limit))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>

                {/* First Page */}
                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => setSkip(0)}
                      className="w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      1
                    </button>
                    {currentPage > 4 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                  </>
                )}

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => setSkip((page - 1) * limit)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        page === currentPage
                          ? "bg-blue-600 text-white font-semibold shadow-md"
                          : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Last Page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                    <button
                      onClick={() => setSkip((totalPages - 1) * limit)}
                      className="w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                {/* Next Button */}
                <button
                  onClick={() => setSkip(skip + limit)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InventoryOverview;
