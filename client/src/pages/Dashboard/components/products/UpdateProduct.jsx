import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getProductBySlug,
  updateProduct,
} from "../../../../features/productSlice";

const UpdateProduct = ({ productSlug }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.productsReducer);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    shipping: "",
    sold: "",
    image: null,
  });

  useEffect(() => {
    if (productSlug) {
      dispatch(getProductBySlug(productSlug)).then((response) => {
        const product = response.payload;
        setFormData({
          name: product?.name,
          description: product?.description,
          quantity: product?.quantity,
          price: product?.price,
          shipping: product?.shipping,
          sold: product?.sold,
          image: null, // Not preloading the image
        });
      });
    }
  }, [productSlug, dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ formData, slug: productSlug })).then((res) => {
      if (res.error) {
        toast.error(res.payload.message);
      } else {
        toast.success("Product updated successfully");
      }
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
      {error && <span className="mt-2 text-red-600 text-center">{error}</span>}

      <form onSubmit={handleSubmit} className="flex flex-wrap justify-between">
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
          <label className="text-sm font-medium mb-2">Sold:</label>
          <input
            type="number"
            name="sold"
            value={formData.sold}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
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
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
