import React from "react";
import {
  Package,
  List,
  Grid,
  ChevronRight,
  Search,
  Filter,
  TrendingUp,
  ShoppingBag,
} from "lucide-react";

const HomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>

            <div className="relative w-24 h-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl transform hover:rotate-6 hover:scale-110 transition-all duration-500">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 rounded-3xl"></div>

              <div className="absolute inset-2 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20"></div>

              <Package className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white drop-shadow-lg" />

              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white shadow-lg animate-bounce"></div>
            </div>
          </div>

          <h1 className="text-6xl font-extrabold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 drop-shadow-sm">
              StoreAdmin
            </span>
            <span className="text-gray-800"> Portal</span>
          </h1>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full"></div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-transparent via-teal-500 to-transparent rounded-full"></div>
          </div>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Modern inventory management system for{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-bold text-emerald-600">
                retail excellence
              </span>
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <button
            onClick={() => onNavigate("inventory")}
            className="group relative overflow-hidden rounded-3xl p-8 text-left transition-all duration-500 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 opacity-90 group-hover:opacity-100 transition-opacity rounded-3xl"></div>

            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQxIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAgMCBMIDAgMCAwIDEwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQxKSIvPjwvc3ZnPg==')] opacity-40 rounded-3xl"></div>

            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-300/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                  <List className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center gap-2 text-white/90 group-hover:translate-x-2 transition-transform">
                  <span className="text-sm font-medium">Explore</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">
                Inventory Overview
              </h2>
              <p className="text-emerald-50 leading-relaxed mb-6">
                Browse and manage your complete product catalog with advanced
                filtering, sorting, and search capabilities.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Search", "Filter", "Sort"].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-sm border border-white/30 group-hover:bg-white/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate("categories")}
            className="group relative overflow-hidden rounded-3xl p-8 text-left transition-all duration-500 hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 opacity-90 group-hover:opacity-100 transition-opacity rounded-3xl"></div>

            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQyIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAgMCBMIDAgMCAwIDEwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQyKSIvPjwvc3ZnPg==')] opacity-40 rounded-3xl"></div>

            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl">
                  <Grid className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center gap-2 text-white/90 group-hover:translate-x-2 transition-transform">
                  <span className="text-sm font-medium">Browse</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">
                Category Catalog
              </h2>
              <p className="text-purple-50 leading-relaxed mb-6">
                Explore products organized by categories with visual cards and
                hierarchical navigation for easy browsing.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Visual Cards", "Drill-down"].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-full text-sm border border-white/30 group-hover:bg-white/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        </div>

        <div className="relative mb-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Key Features
            </h3>
            
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Search,
                title: "Smart Search",
                desc: "Quick product lookup",
                color: "violet",
              },
              {
                icon: Filter,
                title: "Advanced Filters",
                desc: "Category & price filters",
                color: "blue",
              },
              {
                icon: TrendingUp,
                title: "Stock Tracking",
                desc: "Real-time inventory",
                color: "orange",
              },
              {
                icon: ShoppingBag,
                title: "Product Details",
                desc: "Complete information",
                color: "emerald",
              },
            ].map((feature, idx) => (
              <div key={idx} className="group relative text-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`relative mb-5 ${
                      feature.color === "violet"
                        ? "bg-gradient-to-br from-violet-500 to-purple-600"
                        : feature.color === "blue"
                        ? "bg-gradient-to-br from-blue-500 to-cyan-600"
                        : feature.color === "orange"
                        ? "bg-gradient-to-br from-orange-500 to-red-600"
                        : "bg-gradient-to-br from-emerald-500 to-teal-600"
                    } w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300`}
                  >
                    <feature.icon className="w-9 h-9 text-white" />
                    <div
                      className={`absolute -inset-2 ${
                        feature.color === "violet"
                          ? "bg-violet-400"
                          : feature.color === "blue"
                          ? "bg-blue-400"
                          : feature.color === "orange"
                          ? "bg-orange-400"
                          : "bg-emerald-400"
                      } rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>
                  </div>

                  <h4 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-gray-700 transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>

                  <div
                    className={`mt-4 h-1 w-0 ${
                      feature.color === "violet"
                        ? "bg-gradient-to-r from-violet-500 to-purple-600"
                        : feature.color === "blue"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-600"
                        : feature.color === "orange"
                        ? "bg-gradient-to-r from-orange-500 to-red-600"
                        : "bg-gradient-to-r from-emerald-500 to-teal-600"
                    } rounded-full group-hover:w-16 transition-all duration-500 ease-out`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
