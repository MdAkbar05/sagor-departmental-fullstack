import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Magnifier from "react-magnifier";
import { toast } from "react-toastify";
import { addToCart } from "../../features/cartSlice";
import { addReview } from "../../features/productSlice";
import { MdStar } from "react-icons/md";

const ProductDetails = () => {
  const notify = (msg) => toast(msg);
  const dispatch = useDispatch();
  const { currentProduct, isLoading } = useSelector(
    (state) => state.productsReducer
  );
  const profile = JSON.parse(localStorage.getItem("user"));
  // State to handle review form data
  const [review, setReview] = useState({
    userId: profile?.id || "",
    rating: 0,
    comment: "",
  });

  const handleStarClick = (rating) => {
    setReview({ ...review, rating });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (profile) {
      console.log("Review submitted: ", review);
    } else {
      notify("Please log in to review the product.");
      return;
    }
    // Submit review logic here
    const id = currentProduct._id;
    dispatch(addReview({ review, id }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* i want to set loading in full height  */}
      {isLoading && (
        <div className="h-screen flex justify-center items-center text-2xl font-semibold">
          Product Loading...
        </div>
      )}
      {currentProduct && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image with Magnifier */}
            <div className="flex justify-center border w-fit mx-auto p-4 shadow-sm items-center">
              <Magnifier
                src={currentProduct.image}
                width={220}
                mgShape="square"
                zoomFactor={1.5}
              />
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {currentProduct.name}
              </h1>

              <p className="text-gray-800 font-bold text-xl">
                {currentProduct.category.name}
              </p>

              <p className="text-lg text-gray-700">
                Price:{" "}
                <span className="text-xl font-bold">
                  ৳{currentProduct.price}
                </span>
              </p>
              <p className="text-gray-500 leading-relaxed">
                {currentProduct.description}
              </p>
              <div className="flex justify-start gap-4 item-center">
                <p className="text-gray-600">
                  Rating: {currentProduct.ratings.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  Shipping: ৳{currentProduct.shipping}
                </p>
              </div>
              <p className="text-gray-600">
                Available: {currentProduct.quantity} in stock
              </p>

              <div className="mt-6">
                <button
                  className="bg-hightlight text-white px-6 py-2 rounded-md hover:bg-green-500-700"
                  onClick={() => {
                    dispatch(addToCart(currentProduct));
                    notify("Product added successfully");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h2>

            {/* Display Reviews */}
            {currentProduct.reviews && currentProduct.reviews.length > 0 ? (
              <div className="space-y-6">
                {currentProduct.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="border-b space-y-2 flex gap-8 justify-between  items-center p-6 bg-secondary rounded-xl shadow-xl"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <span className="size-10 rounded-full font-semibold text-lg bg-primary flexCenter text-white">
                        {review.user.name?.slice(0, 1)}
                      </span>
                      <p className="">{review.user.name}</p>
                    </div>
                    <p className="text-black py-4">{review.comment}</p>
                    <div className="flex items-center gap-4 flex-col">
                      <span>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <span key={i} className="text-lg">
                            <MdStar size={24} color="white" />
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}

            {/* Write a Review Form */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Write a Review
              </h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Star Rating Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <MdStar
                        key={star}
                        size={32}
                        className={`cursor-pointer ${
                          star <= review.rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleStarClick(star)}
                      />
                    ))}
                  </div>
                  <input
                    type="hidden"
                    id="rating"
                    name="rating"
                    value={review.rating}
                  />
                </div>

                {/* Comment Input */}
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={review.comment}
                    onChange={(e) =>
                      setReview({ ...review, comment: e.target.value })
                    }
                    rows="4"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
