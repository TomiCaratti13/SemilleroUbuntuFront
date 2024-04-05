import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categoryLista: [],
  },
  reducers: {
    addCategory: (state, action) => {
      const { title, identifier, cantidad, img, description } = action.payload;
      state.categoryLista?.push({
        title: title,
        identifier: identifier,
        // cantidad: cantidad,
        img: img,
        // description: description,
      });
    },
  },
});

export const { addCategory } = categorySlice.actions;
export default categorySlice.reducer;