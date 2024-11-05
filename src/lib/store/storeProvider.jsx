import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/features/cartSlice';
import userReducer from '../store/features/userSlice'
import productsReducer from '../store/features/productSlice'
import wishListReducer from '../store/features/whishListSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
    wishList: wishListReducer,
  },
});

export default store;
