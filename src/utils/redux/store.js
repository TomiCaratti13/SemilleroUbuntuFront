import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import tokenReducer from './tokenSlice';
// import publiReducer from './publiSlice';
// import microReducer from './microSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    category : categoryReducer,
    // publicacion: publiReducer,
    // microemprendimiento: microReducer,
  },
})