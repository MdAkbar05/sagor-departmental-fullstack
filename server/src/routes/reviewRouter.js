const express = require("express");
const { handleGetReviews } = require("../controllers/reviewController");

const reviewRouter = express.Router();
// GET all orders or orders by user
reviewRouter.get("/", handleGetReviews);

// DELETE an order by ID
// reviewRouter.delete("/:id", deleteOrder);

module.exports = reviewRouter;
