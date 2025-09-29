import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../features/productSlice";
import { deleteProduct } from "../../../../features/productSlice";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";
import { toast } from "react-toastify";

const Products = () => {
  const [tabMenu, setTabMenu] = useState(true); // To toggle between AddProduct and UpdateProduct components
  const [selectedProductSlug, setSelectedProductSlug] = useState(null); // To store selected product slug for editing
  const [isPopupOpen, setIsPopupOpen] = useState(false); // To toggle the popup visibility

  const dispatch = useDispatch();
  const { products, error, isLoading } = useSelector(
    (state) => state.productsReducer
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products by name based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (slug) => {
    dispatch(deleteProduct(slug)).then(() => {
      dispatch(getProducts()); // Refresh the products list after deletion
      toast.success("Product deleted successfully");
    });
  };

  const handleEdit = (slug) => {
    setSelectedProductSlug(slug); // Set the product's slug to pass as a prop
    setIsPopupOpen(true); // Open the popup for editing
    setTabMenu(false); // Set to UpdateProduct
  };

  const handleAddProduct = () => {
    setSelectedProductSlug(null); // Clear selected product (no product for adding)
    setIsPopupOpen(true); // Open the popup for adding
    setTabMenu(true); // Set to AddProduct
  };

  return (
    <div className="sm:p-2 md:p-4 lg:p-6 flex-col w-full">
      <div className="text-primary text-3xl font-semibold mb-4">
        All Products
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search products by name"
        className="border p-2 rounded w-full mb-4"
      />
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div className="w-full h-[456px] overflow-y-scroll">
        <table className="w-full bg-white border border-gray-200 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-sm py-2 px-4 border-b">Image</th>
              <th className="text-sm py-2 px-4 border-b">Name</th>
              <th className="text-sm py-2 px-4 border-b">Price</th>
              <th className="text-sm py-2 px-4 border-b">Quantity</th>
              <th className="text-sm py-2 px-4 border-b">Shipping</th>
              <th className="text-sm py-2 px-4 border-b">Sold</th>
              <th className="text-sm py-2 px-4 border-b">Description</th>
              <th className="text-sm py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="overflow-y-scroll">
            {filteredProducts &&
              filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <tr key={product?._id} className="text-left">
                  <td className="py-2 px-4 border-b">
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="text-sm py-2 px-4 border-b">
                    {product?.name}
                  </td>
                  <td className="text-sm py-2 px-4 border-b">
                    {product?.price}
                  </td>
                  <td className="text-sm py-2 px-4 border-b">
                    {product?.quantity}
                  </td>
                  <td className="text-sm py-2 px-4 border-b">
                    {product?.shipping}
                  </td>
                  <td className="text-sm py-2 px-4 border-b">
                    {product?.sold}
                  </td>
                  <td className="text-sm py-2 px-4 border-b">
                    {product?.description}
                  </td>
                  <td className="text-sm px-4 border-b  ">
                    <div className="space-x-2">
                      <span
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer"
                        onClick={() => handleDelete(product.slug)}
                      >
                        Delete
                      </span>
                      <span
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 cursor-pointer"
                        onClick={() => handleEdit(product.slug)}
                      >
                        Edit
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Button */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 top-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-3/4 p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold text-gray-500"
              onClick={() => setIsPopupOpen(false)}
            >
              &times;
            </button>
            {tabMenu ? (
              <AddProduct />
            ) : (
              <UpdateProduct productSlug={selectedProductSlug} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
