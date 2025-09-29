import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [],
  totalFavCount: 0,
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    addToFavourite: (state, action) => {
      const existingItem = state.item.find(
        (itm) => itm._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.item.push({ ...action.payload, quantity: 1 });
      }

      state.totalFavCount = state.item.reduce(
        (count, itm) => count + itm.quantity,
        0
      );
    },

    removeFromFavourite: (state, action) => {
      state.item = state.item.filter((itm) => itm._id !== action.payload);
      state.totalFavCount = state.item.reduce(
        (count, itm) => count + itm.quantity,
        0
      );
    },
    clearFavourite: (state) => {
      state.item = [];
      state.totalFavCount = 0;
    },
  },
});

export const { addToFavourite, removeFromFavourite, clearFavourite } =
  favouriteSlice.actions;
export default favouriteSlice.reducer;
