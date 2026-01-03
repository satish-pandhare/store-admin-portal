import React, { useState } from "react";
import HomePage from "./components/HomePage";
import InventoryOverview from "./components/InventoryOverview";
import ProductDetails from "./components/ProductDetails";
import CategoryOverview from "./components/CategoryOverview";
import "./App.css";

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleNavigate = (view) => {
    setCurrentView(view);
    setSelectedProductId(null);
    setSelectedCategory(null);
  };

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView("product-details");
  };

  const handleSelectCategory = (categorySlug) => {
    setSelectedCategory(categorySlug);
    setCurrentView("category-products");
  };

  const handleBack = () => {
    if (currentView === "product-details") {
      if (selectedCategory) {
        setCurrentView("category-products");
      } else {
        setCurrentView("inventory");
      }
      setSelectedProductId(null);
    } else if (currentView === "category-products") {
      setCurrentView("categories");
      setSelectedCategory(null);
    } else {
      setCurrentView("home");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "home" && <HomePage onNavigate={handleNavigate} />}

      {currentView === "inventory" && (
        <InventoryOverview
          onSelectProduct={handleSelectProduct}
          onBack={() => handleNavigate("home")}
        />
      )}

      {currentView === "categories" && (
        <CategoryOverview
          onSelectCategory={handleSelectCategory}
          onNavigateToInventory={() => handleNavigate("inventory")}
          onBack={() => handleNavigate("home")}
        />
      )}

      {currentView === "category-products" && (
        <InventoryOverview
          onSelectProduct={handleSelectProduct}
          categoryFilter={selectedCategory}
          onBack={handleBack}
        />
      )}

      {currentView === "product-details" && selectedProductId && (
        <ProductDetails productId={selectedProductId} onBack={handleBack} />
      )}
    </div>
  );
};

export default App;
