import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
import tokenReducer from './tokenSlice';
import categoryReducer from './categorySlice';
import publicacionReducer from './publicacionSlice';
// import microReducer from './microSlice';

const userPersistConfig = {
  key: 'user',
  storage,
};

const tokenPersistConfig = {
  key: 'token',
  storage,
};

const categoryPersistConfig = {
  key: 'category',
  storage,
};

const publicacionPersistConfig = {
  key: 'publicacion',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedTokenReducer = persistReducer(tokenPersistConfig, tokenReducer);
const persistedCategoryReducer = persistReducer(
  categoryPersistConfig,
  categoryReducer
);
const persistedPublicacionReducer = persistReducer(
  publicacionPersistConfig,
  publicacionReducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    token: persistedTokenReducer,
    category: persistedCategoryReducer,
    publicacion: persistedPublicacionReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
