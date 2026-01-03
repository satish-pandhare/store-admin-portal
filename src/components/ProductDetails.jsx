import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Star,
  Loader,
  Package2,
  TrendingUp,
  Calendar,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import api from "../utils/api";

const ProductDetails = ({ productId, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Fetch product details with React Query
  const { data: product, isLoading: loading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => api.getProduct(productId),
  });

  // Fetch similar products with React Query
  const { data: similarProductsData } = useQuery({
    queryKey: ["similarProducts", product?.category, productId],
    queryFn: async () => {
      const data = await api.getProductsByCategory(product.category, 6);
      return data.products.filter((p) => p.id !== productId);
    },
    enabled: !!product?.category, // Only run when product category is available
    staleTime: 10 * 60 * 1000, // Similar products stay fresh for 10 minutes
  });

  const similarProducts = similarProductsData || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Product not found</p>
          <button
            onClick={onBack}
            className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Inventory</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 relative group">
                <img
                  src={product.images[selectedImage] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discountPercentage.toFixed(0)}% OFF
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {product.availabilityStatus}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden transition-all ${
                        selectedImage === idx
                          ? "ring-2 ring-blue-600 ring-offset-2"
                          : "hover:ring-2 hover:ring-gray-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mt-8 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-slate-50 text-gray-700 rounded-full text-sm font-medium hover:from-emerald-100 hover:to-slate-100 transition-colors border border-emerald-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dimensions & Weight */}
              {product.dimensions && (
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-3 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Dimensions & Weight
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg p-2">
                      <span className="text-sm text-gray-600 block mb-0.5">
                        Width
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        {product.dimensions.width} cm
                      </span>
                    </div>
                    <div className="rounded-lg p-2">
                      <span className="text-sm text-gray-600 block mb-0.5">
                        Height
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        {product.dimensions.height} cm
                      </span>
                    </div>
                    <div className="rounded-lg p-2">
                      <span className="text-sm text-gray-600 block mb-0.5">
                        Depth
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        {product.dimensions.depth} cm
                      </span>
                    </div>
                    <div className="rounded-lg p-2">
                      <span className="text-sm text-gray-600 block mb-0.5">
                        Weight
                      </span>
                      <span className="text-lg font-semibold text-gray-900">
                        {product.weight} kg
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Brand & Title */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-3">
                  {product.brand}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-500">
                    ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.discountPercentage > 0 && (
                    <>
                      <span className="text-2xl text-gray-400 line-through">
                        ${originalPrice}
                      </span>
                      <span className="text-xl text-green-600 font-semibold">
                        {product.discountPercentage.toFixed(1)}% Off
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-500">Inclusive of all taxes</p>
              </div>

              {/* Stock & Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Package2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm text-gray-600 font-medium">
                      Stock
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {product.stock}{" "}
                    <span className="text-base font-normal text-gray-600">
                      units
                    </span>
                  </div>
                  <div className="mt-1">
                    {product.stock > 50 ? (
                      <span className="text-xs text-green-700 font-medium">
                        High Stock
                      </span>
                    ) : product.stock > 20 ? (
                      <span className="text-xs text-emerald-700 font-medium">
                        Good Stock
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="text-xs text-yellow-700 font-medium">
                        Low Stock
                      </span>
                    ) : (
                      <span className="text-xs text-red-700 font-medium">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-5 h-5 text-slate-600" />
                    <span className="text-sm text-gray-600 font-medium">
                      Min. Order
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {product.minimumOrderQuantity}{" "}
                    <span className="text-base font-normal text-gray-600">
                      units
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="text-xs text-slate-700 font-medium">
                      Bulk Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-3 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Information
                </h3>

                <div className="flex items-center justify-between py-3 border-b hover:bg-gray-50 px-3 -mx-3 rounded-lg transition-colors">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Package2 className="w-4 h-4" />
                    Category
                  </span>
                  <span className="font-medium capitalize text-gray-900">
                    {product.category}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b hover:bg-gray-50 px-3 -mx-3 rounded-lg transition-colors">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    SKU
                  </span>
                  <span className="font-medium text-gray-900">
                    {product.sku}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b hover:bg-gray-50 px-3 -mx-3 rounded-lg transition-colors">
                  <span className="text-gray-600 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Warranty
                  </span>
                  <span className="font-medium text-gray-900">
                    {product.warrantyInformation}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 border-b hover:bg-gray-50 px-3 -mx-3 rounded-lg transition-colors">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Shipping
                  </span>
                  <span className="font-medium text-gray-900">
                    {product.shippingInformation}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3 hover:bg-gray-50 px-3 -mx-3 rounded-lg transition-colors">
                  <span className="text-gray-600 flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Return Policy
                  </span>
                  <span className="font-medium text-gray-900">
                    {product.returnPolicy}
                  </span>
                </div>
              </div>

              {/* Customer Reviews */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Customer Reviews ({product.reviews.length})
                  </h3>
                  <div className="space-y-4">
                    {(showAllReviews
                      ? product.reviews
                      : product.reviews.slice(0, 1)
                    ).map((review, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-emerald-50 to-slate-50 border border-emerald-200 rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
                              <span className="text-lg font-bold text-emerald-900">
                                {review.reviewerName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {review.reviewerName}
                              </p>
                              <p className="text-xs text-gray-600">
                                {new Date(review.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                  {product.reviews.length > 1 && (
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="mt-3 text-800 font-semibold hover:text-emerald-900 transition-colors"
                    >
                      {showAllReviews
                        ? "Show Less"
                        : `Show ${product.reviews.length - 1} More Review${
                            product.reviews.length - 1 > 1 ? "s" : ""
                          }`}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Similar Products
                </h2>
                <p className="text-gray-600 mt-1">From the same category</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similarProducts.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    // fetchProductDetails(prod.id);
                  }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-4 text-left group"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={prod.thumbnail}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {prod.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${prod.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">
                        {prod.rating}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
