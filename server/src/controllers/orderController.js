const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");
const { jwtRefreshToken } = require("../secret");

// Get all orders or orders by user
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("cartItems.product", "image");
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving orders", error: error.message });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { cartItems, totalPrice, shippingDetails } = req.body;
    console.log(req.body);
    const token = req.cookies.refreshToken;

    const decoded = jwt.verify(token, jwtRefreshToken);
    console.log(decoded);
    // Validate request
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Map cartItems to include the `product` field
    const mappedCartItems = cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      product: item._id, // Use _id as the product reference
    }));

    // Create a new order
    const order = new Order({
      user: decoded.users._id,
      cartItems: mappedCartItems,
      shippingDetails,
      totalPrice,
    });

    // Save the order in the database
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error });
  }
};

// update order status

const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();
    console.log(order);

    res
      .status(200)
      .json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = {
  getOrders,
  createOrder,
  deleteOrder,
  updateOrderStatus,
};
