import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/features/cartSlice';
import userReducer from '../store/features/userSlice'
import productsReducer from '../store/features/productSlice'
import wishListReducer from '../store/features/whishListSlice'
import adminReducer from '../store/features/adminSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productsReducer,
    wishList: wishListReducer,
    admin: adminReducer,
  },
});

export default store;
