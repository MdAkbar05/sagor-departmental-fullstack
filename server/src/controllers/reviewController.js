const path = require("path");
const createError = require("http-errors");
const downloadImage = require("../services/downloadImageByPath");
const ClientReview = require("../models/reviewModel");

// /api/reviews Get
const handleGetReviews = async (req, res) => {
  try {
    const reviews = await ClientReview.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Review Fetched successfully", reviews });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleDeleteReview = async (req, res) => {
  try {
    const review = await ClientReview.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted successfully", review });
  } catch (error) {
    next(createError(500, error.message));
  }
};

module.exports = {
  handleGetReviews,

  handleDeleteReview,
};
