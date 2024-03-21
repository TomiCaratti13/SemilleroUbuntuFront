import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import tokenReducer from './tokenSlice';
import categoryReducer from './categorySlice';
import publicacionReducer from './publicacionSlice';
// import microReducer from './microSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    category : categoryReducer,
    publicacion: publicacionReducer,
    // microemprendimiento: microReducer,
  },
})