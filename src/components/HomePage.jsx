import React from 'react';
import { Package, List, Grid, ChevronRight, Search, Filter, TrendingUp, ShoppingBag } from 'lucide-react';

const HomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6 shadow-lg">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            StoreAdmin Portal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Modern inventory management system for retail excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => onNavigate('inventory')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-left border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                <List className="w-7 h-7 text-blue-600 group-hover:text-white" />
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Inventory Overview
            </h2>
            <p className="text-gray-600">
              Browse and manage your complete product catalog with advanced filtering, sorting, and search capabilities.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Search</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Filter</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">Sort</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('categories')}
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-left border-2 border-transparent hover:border-purple-500"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                <Grid className="w-7 h-7 text-purple-600 group-hover:text-white" />
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Category Catalog
            </h2>
            <p className="text-gray-600">
              Explore products organized by categories with visual cards and hierarchical navigation for easy browsing.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">Visual Cards</span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">Drill-down</span>
            </div>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Search, title: 'Smart Search', desc: 'Quick product lookup' },
              { icon: Filter, title: 'Advanced Filters', desc: 'Category & price filters' },
              { icon: TrendingUp, title: 'Stock Tracking', desc: 'Real-time inventory' },
              { icon: ShoppingBag, title: 'Product Details', desc: 'Complete information' }
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-gray-700" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;