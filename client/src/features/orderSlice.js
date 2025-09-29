import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendURL } from "../secret";
const baseUrl = backendURL;
// Async thunk for submitting the order
export const submitOrder = createAsyncThunk(
  "order/submitOrder",
  async ({ cart, shippingDetails }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/orders`,
        {
          cartItems: cart.item,
          totalPrice: cart.totalPrice,
          shippingDetails,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for getting all orders
export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/api/orders`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// update order status
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/orders/update-status`,
        { orderId, status },
        { withCredentials: true }
      );
      return response.data.order;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetails: null,
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetOrder: (state) => {
      state.orderDetails = null;
      state.orders = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //submit order
      .addCase(submitOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderDetails = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // get orders
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
