import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductBySlug,
  getProducts,
  getProductsByCategory,
  toggleCategoryFilter,
} from "../../features/productSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCategories } from "../../features/categorySlice";
import ProductsLoading from "../../components/Preloaders/productsLoading";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categoryReducer);

  useEffect(() => {
    dispatch(getProducts()).then(() => {});
    dispatch(fetchCategories()).then(() => {});
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const category = query.get("category");
    if (category) {
      dispatch(getProductsByCategory(category));
    }
  }, [location.search, dispatch]);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.slug}`);
  };
  // Fetch products on component mount
  const { products, filteredProducts, error, isLoading } = useSelector(
    (state) => state.productsReducer
  );

  return (
    <div className="flex flex-col lg:flex-row p-2 gap-4">
      {/* Filter Category  */}
      <div className="border border-gray-200 space-y-4 rounded-lg p-4 w-full lg:w-64 bg-white shadow-sm">
        <div className="text-lg font-semibold text-gray-800 ">
          Filter by Category
        </div>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category._id}
              className="flex justify-start items-center gap-2 mb-2 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <input
                type="checkbox"
                checked={
                  new URLSearchParams(location.search).get("category") ===
                  category.slug
                }
                readOnly
                className="accent-orange-500 h-4 w-4 cursor-pointer"
              />
              <label className="cursor-pointer text-gray-800 text-sm">
                {category.name}
              </label>
            </div>
          ))
        ) : (
          <p className="text-red-600">Not found categories!</p>
        )}
      </div>

      {/* Products Section */}
      <div className="w-full bg-slate-50 p-2 rounded-lg shadow-sm flex flex-col gap-2 overflow-y-scroll h-[90vh]">
        {/* Header */}
        <div className="text-center text-2xl font-semibold text-gray-800 mb-6">
          <div className="text-orange-500">GET 20% OFF ON ALL PRODUCTS</div>
        </div>

        {/* Loading and Error Handling */}
        {isLoading && (
          <div className="text-center text-gray-600">
            <ProductsLoading />
          </div>
        )}
        {error && <div className="text-center text-red-500">{error}</div>}

        {/* Products Grid */}
        <div className="flex flex-wrap gap-6 justify-center">
          {filteredProducts && filteredProducts.length === 0 ? (
            <div className="text-red-600 text-lg">No products found</div>
          ) : (
            filteredProducts &&
            filteredProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
