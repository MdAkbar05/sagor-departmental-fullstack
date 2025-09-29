const { successResponse } = require("./responseController");
const Products = require("../models/productsModel");
const createError = require("http-errors");
const slugify = require("slugify");
const path = require("node:path");
const {
  createProduct,
  getProduct,
  deleteProductbySlug,
} = require("../services/productsServices");
const { sign } = require("node:crypto");
const { deleteProductImage } = require("../services/deleteImage");
const Review = require("../models/reviewModel");
const Category = require("../models/categoryModel");

// Create a new product
const handleCreateProduct = async (req, res, next) => {
  console.log("reached endpoint");
  try {
    const { name, description, quantity, price, shipping, category } = req.body;

    const productData = {
      name,
      description,
      quantity,
      price,
      shipping,
      category,
    };
    console.log(req.file);
    const image = req.file
      ? `/images/products/${req.file.filename}`
      : "default.png";

    if (image) {
      productData.image = image;
    }
    const product = await createProduct(productData);
    return res.status(200).json({
      message: "New Product created successfully",
      payload: { product },
    });
    // return successResponse(res, {
    //   statusCode: 200,
    //   message: "New products were created successfully",
    //   payload: { product },
    // });
  } catch (error) {
    next(error);
  }
};
// Get all product
const handleGetProducts = async (req, res, next) => {
  try {
    // const page = parseInt(req.params.page) || 1;
    // const limit = parseInt(req.params.limit) || 10;

    const product = await getProduct();
    // const count = product.length;
    // const totalPages = Math.ceil(count / limit);

    return successResponse(res, {
      statusCode: 200,
      message: "Return all products successfully",
      payload: {
        product,
        // pagination: {
        //   totalPages: totalPages,
        //   currentPage: page,
        //   previousPage: page > 1 ? page - 1 : 1,
        //   nextPage: page < totalPages ? page + 1 : totalPages,
        //   limit,
        //   totalCount: count,
        // },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Add a review to a product
const addReview = async (req, res) => {
  const { rating, comment, userId } = req.body;
  const productId = req.params.id;

  try {
    const product = await Products.findById(productId);

    if (product) {
      // Create a new review
      const review = new Review({
        user: userId, // Assuming you have user authentication
        rating,
        comment,
      });

      await review.populate("user");
      await review.save();

      // Add the new review ID to the product's reviews array
      product.reviews.push(review._id);
      product.numReviews = product.reviews.length;

      // Populate the reviews array with actual Review data
      await product.populate({
        path: "reviews",
        populate: { path: "user" }, // Populate user details within each review
      });

      // Recalculate the average rating
      product.ratings =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      console.log(product);
      await product.save();

      console.log("Reached");
      res.status(201).json({ message: "Review added successfully", product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get  products by Category
const handleGetProductsByCategory = async (req, res, next) => {
  try {
    // Find the category by slug
    const categoryDoc = await Category.findOne({
      slug: req.query.category,
    });

    if (!categoryDoc) {
      return res.status(404).json({
        success: true,
        message: "No products found by the category",
        payload: [], // Return an empty array if no products are found
      });
    }
    console.log(categoryDoc);

    const products = await Products.find({ category: categoryDoc._id })
      .populate({
        path: "reviews", // Populate reviews
        populate: {
          path: "user", // Populate user details for each review
          select: "name email", // Select specific fields from User model, adjust as needed
        },
      })
      .populate("category");

    console.log(products);

    return successResponse(res, {
      statusCode: 200,
      message: "Return product successfully",
      payload: { products },
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// Get Product by brand
// const handleGetProductsByBrand = async (req, res, next) => {
//   try {
//     const { brand } = req.query;

//     if (!brand) {
//       return res.status(400).json({
//         success: false,
//         message: "Brand query parameter is required",
//       });
//     }

//     const products = await Products.find({
//       brand: { $regex: brand, $options: "i" },
//     })
//       .populate({
//         path: "reviews", // Populate reviews
//         populate: {
//           path: "user", // Populate user details for each review
//           select: "name email", // Select specific fields from User model, adjust as needed
//         },
//       })
//       .populate("category");

//     if (!products || products.length === 0) {
//       return res.status(404).json({
//         success: true,
//         message: "No products found for the specified brand",
//         payload: [], // Return an empty array if no products are found
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Products returned.",
//       payload: products,
//     });
//   } catch (error) {
//     return res.status(500).json({ message: "Problem with controller", error });
//   }
// };

// Update a single product by slug
const handleUpdateProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Products.findOne({ slug: slug });
    const updateOption = { new: true, runValidators: true, context: "query" };

    let updates = {};

    const allowedFields = [
      "name",
      "description",
      "price",
      "sold",
      "quantity",
      "shipping",
    ];
    for (const key in req.body) {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      } else {
        throw createError(400, `Invalid update field: ${key}`);
      }
    }

    if (updates.name) {
      updates.slug = slugify(updates.name);
    }

    const imgPath = req.file ? req.file.path : null;
    if (imgPath) {
      if (imgPath.size > 1024 * 1024 * 2) {
        throw createError(400, "Product image size should not exceed 2MB.");
      }
    }
    let image;
    if (imgPath) {
      const imageName = imgPath ? path.basename(imgPath) : null;
      image = `/images/products/${imageName}`;
    }

    if (image) {
      updates.image = image;
      product.image !== "default.png" && deleteProductImage(product.image);
    }

    const updatedProduct = await Products.findOneAndUpdate(
      { slug },
      updates,
      updateOption
    );

    if (!updatedProduct) {
      throw createError(404, "Product not updated found.");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Product updated successfully",
      payload: { updatedProduct },
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    await deleteProductbySlug(slug);
    return successResponse(res, {
      statusCode: 200,
      message: "Delete product successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Search products by name, description, or category
const handleSearchProducts = async (req, res, next) => {
  console.log("reached");
  try {
    const { query } = req.query; // Correctly destructure query from req.query

    if (!query) {
      const products = await Products.find();
      return res.status(200).json({
        success: true,
        message: "Products returned.",
        payload: products,
      });
    }

    console.log(query); // Debug log to see the query string

    // Adjust filter based on search term
    const searchResults = await Products.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive search in the product name
        { description: { $regex: query, $options: "i" } }, // Case-insensitive search in the product description
      ],
    });

    console.log(searchResults); // Debug log to see the search results

    if (!searchResults || searchResults.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No products found",
        payload: [], // Return an empty array if no products are found
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products returned.",
      payload: searchResults,
    });
  } catch (error) {
    return res.status(500).json({ message: "Problem with controller", error });
  }
};

// get products by category query parameters
const handleGetProductBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const product = await Products.findOne({ slug: slug })
      .populate({
        path: "reviews", // Populate reviews
        populate: {
          path: "user", // Populate user details for each review
          select: "name email", // Select specific fields from User model, adjust as needed
        },
      })
      .populate("category");

    return res.status(200).json({
      success: true,
      message: "Products returned.",
      payload: product,
    });
  } catch (error) {
    return res.status(500).json({ message: "Problem with controller", error });
  }
};

module.exports = {
  handleCreateProduct,
  handleGetProducts,
  handleGetProductsByCategory,
  handleUpdateProduct,
  handleDeleteProduct,
  handleSearchProducts,
  addReview,
  handleGetProductBySlug,
};
