import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "../services/productApi";
import { categoryApi } from "../services/categoryApi";
import { authApi } from "../services/authApi";
import { checkoutApi } from "../services/checkoutApi";
import { orderApi } from "../services/orderApi";
import { resetPasswordApi } from "../services/resetPassword";
import { favoriteApi } from "../services/favoriteApi";
import { shippingApi } from "../services/shippingApi";
import productIdReducer from "./slices/productIdSlice";
import isAuthInReducer from "./slices/loginSlice";
import cartReducer from "./slices/cartSlice";
import overlaySlice from "./slices/overlaySlice";
import filteredSlice from "./slices/filteredSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [resetPasswordApi.reducerPath]: resetPasswordApi.reducer,
    [favoriteApi.reducerPath]: favoriteApi.reducer,
    [shippingApi.reducerPath]: shippingApi.reducer,
    productId: productIdReducer,
    isAuth: isAuthInReducer,
    cart: cartReducer,
    overlay: overlaySlice,
    filtered: filteredSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(authApi.middleware)
      .concat(checkoutApi.middleware)
      .concat(orderApi.middleware)
      .concat(resetPasswordApi.middleware)
      .concat(favoriteApi.middleware)
      .concat(shippingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
