import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    lista : []
  },
  reducers: {
    addCategory: (state, action) => {
      const { title, identifier, cantidad, img, description } = action.payload;
      state.lista.push({ title: title, identifier: identifier, cantidad: cantidad, img: img, description: description});
    },
  },
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;
