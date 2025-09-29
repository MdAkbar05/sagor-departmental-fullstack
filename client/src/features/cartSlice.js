import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.item.find(
        (itm) => itm._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.item.push({ ...action.payload, quantity: 1 });
      }
      state.totalPrice = state.item.reduce(
        (total, itm) => total + itm.price * itm.quantity,
        0
      );
      state.totalCount = state.item.reduce(
        (count, itm) => count + itm.quantity,
        0
      );
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.item.find((itm) => itm._id === id);

      if (item) {
        item.quantity = quantity;
        state.totalPrice = state.item.reduce(
          (total, itm) => total + itm.price * itm.quantity,
          0
        );
        state.totalCount = state.item.reduce(
          (count, itm) => count + itm.quantity,
          0
        );
      }
    },
    removeFromCart: (state, action) => {
      state.item = state.item.filter((itm) => itm._id !== action.payload);
      state.totalPrice = state.item.reduce(
        (total, itm) => total + itm.price * itm.quantity,
        0
      );
      state.totalCount = state.item.reduce(
        (count, itm) => count + itm.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.item = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addToCart, changeQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
