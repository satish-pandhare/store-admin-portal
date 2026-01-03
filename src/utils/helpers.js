export const getStockStatus = (stock) => {
  if (stock === 0) {
    return { 
      label: 'Out of Stock', 
      color: 'bg-red-100 text-red-800' 
    };
  }
  if (stock < 20) {
    return { 
      label: 'Low Stock', 
      color: 'bg-yellow-100 text-yellow-800' 
    };
  }
  return { 
    label: 'In Stock', 
    color: 'bg-green-100 text-green-800' 
  };
};

export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

export const calculateDiscountedPrice = (price, discountPercentage) => {
  const discounted = price - (price * discountPercentage / 100);
  return discounted.toFixed(2);
};