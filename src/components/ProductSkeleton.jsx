import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;