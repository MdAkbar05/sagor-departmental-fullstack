import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import usersSlice from "./features/usersSlice";
import categorySlice from "./features/categorySlice";
import cartSlice from "./features/cartSlice";
import favouriteSlice from "./features/favouriteSlice";
import orderSlice from "./features/orderSlice";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    productsReducer: productSlice,
    usersReducer: usersSlice,
    authReducer: authSlice,
    categoryReducer: categorySlice,
    cartReducer: cartSlice,
    favouriteReducer: favouriteSlice,
    orderReducer: orderSlice,
  },
});
