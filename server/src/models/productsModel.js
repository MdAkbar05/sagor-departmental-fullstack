const { Schema, model, default: mongoose } = require("mongoose");

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Product name should have at least 2 characters"],
      maxlength: [150, "Product name can have up to 150 characters"],
      validate: {
        validator: function (v) {
          return /^[A-Za-z\s]+$/.test(v); // Allow only alphabets and spaces
        },
        message: (props) =>
          `${props.value} is not a valid name. Only alphabets are allowed.`,
      },
    },

    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [3, "Product description must have at least 3 characters"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [1, "Product price must be greater than 0"],
    },

    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: [1, "Product quantity must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: (props) =>
          `${props.value} is not a valid quantity. Must be an integer.`,
      },
    },

    sold: {
      type: Number,
      default: 0, // Set default value for sold
    },

    shipping: {
      type: Number,
      default: 0, // Set default for shipping as 0 (free shipping)
    },

    image: {
      type: String,
      default: "/images/products/default-image.png", // Default product image
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reference to Review
    ratings: { type: Number, default: 5 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = model("Product", productsSchema);

module.exports = Product;
