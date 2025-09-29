const slugify = require("slugify");
const Products = require("../models/productsModel");
const createError = require("http-errors");
const path = require("path");
const { deleteProductImage } = require("./deleteImage");
const Review = require("../models/reviewModel");

const createProduct = async (productData) => {
  const { name, description, quantity, price, shipping, category, image } =
    productData;
  console.log(productData);
  const productExists = await Products.exists({ name: name });

  if (productExists) {
    throw createError(409, "Product with this name already exists.");
  }
  console.log(productExists);
  // Create new product
  const product = await Products.create({
    name,
    slug: slugify(name),
    description: description,
    quantity: Number(quantity),
    price: Number(price),
    shipping: Number(shipping),
    image: image,
    category: category,
  });

  return product;
};

const getProduct = async () => {
  const products = await Products.find({})
    .populate({
      path: "reviews", // Populate reviews
      populate: {
        path: "user", // Populate user details for each review
        select: "name email", // Select specific fields from User model, adjust as needed
      },
    })
    .populate("category")
    // .skip((page - 1) * limit)
    // .limit(limit)
    .sort({ createdAt: -1 });

  if (!products || products.length === 0) {
    throw createError(409, " product not found");
  }

  return products;
};

const deleteProductbySlug = async (slug) => {
  const product = await Products.findOne({ slug: slug });
  if (!product) {
    throw createError(404, "Product not found with the slug");
  }
  if (product && product.image) {
    await deleteProductImage(product.image);
  }

  // Delete reviews associated with the product
  await Review.deleteMany({ _id: { $in: product.reviews } });

  await Products.deleteOne({ slug: slug });
};
module.exports = {
  createProduct,
  getProduct,
  deleteProductbySlug,
};
