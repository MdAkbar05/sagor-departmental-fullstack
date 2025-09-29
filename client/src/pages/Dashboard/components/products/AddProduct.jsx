import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../../../features/productSlice";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createCategory,
  fetchCategories,
} from "../../../../features/categorySlice";
import {
  getProductBySlug,
  updateProduct,
} from "../../../../features/productSlice";
import FormData from "form-data";

const AddProduct = () => {
  const dispatch = useDispatch();
  const notify = (msg) => toast(msg);
  const [categoryName, setCategoryName] = useState("");
  const { status, error } = useSelector((state) => state.productsReducer);
  const { categories } = useSelector((state) => state.categoryReducer);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    shipping: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addProduct(formData)).then((res) => {
        if (res.type === "products/addProduct/fulfilled") {
          notify("Product added successfully");
        }
      });
    } catch (error) {
      notify("Error with adding product, Check console.");
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      {error && <span className="mt-2 text-red-600 text-center">{error}</span>}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-wrap justify-between"
      >
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 p-2">
          <label className="text-sm font-medium mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 p-2">
          <label className="text-sm font-medium mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          ></textarea>
        </div>
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 p-2">
          <label className="text-sm font-medium mb-2">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 p-2">
          <label className="text-sm font-medium mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 p-2">
          <label className="text-sm font-medium mb-2">Shipping:</label>
          <input
            type="number"
            name="shipping"
            value={formData.shipping}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 p-2">
          <label className="text-sm font-medium mb-2">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="flex">
            <input
              type="text"
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Add new category"
              className="bg-slate-200 text-black rounded-lg mt-2 px-4 py-2 hover:bg-slate-300 transition-colors focus:outline-none"
            />
            <button
              onClick={() => dispatch(createCategory(categoryName))}
              className="bg-slate-200 text-black text-xl rounded-lg -ml-4 mt-2 px-4 py-2 hover:bg-slate-300 transition-colors"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/3 p-2">
          <label className="text-sm font-medium mb-2">Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div className="flex justify-end w-full p-2">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
