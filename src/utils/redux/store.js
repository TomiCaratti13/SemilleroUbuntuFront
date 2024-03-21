import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import tokenReducer from './tokenSlice';
import categoryReducer from './categorySlice';
import publicacionReducer from './publicacionSlice';
// import microReducer from './microSlice';

const persistConfig = {
  key: 'root',
  storage,// Cosas del estado que no quieres persistir
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedTokenReducer = persistReducer(persistConfig, tokenReducer);
const persistedCategoryReducer = persistReducer(persistConfig, categoryReducer);
const persistedPublicacionReducer = persistReducer(persistConfig, publicacionReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    token: persistedTokenReducer,
    category: persistedCategoryReducer,
    publicacion: persistedPublicacionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);